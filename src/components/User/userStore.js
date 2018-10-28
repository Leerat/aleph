import { observable, action, computed, toJS } from 'mobx'

import fetcher from 'utils/fetcher'

class UserStore {
  @observable data = {}

  @action
  tryRegister = async(email, password, cpassword) => {
    const body = {
      email, password, cpassword
    }
    const resp = await fetcher.post('https://testapi.alephpay.com/api/user', body)
    const json = await resp.json()

    if (json.status === 200) this.data = { user: json }
  }

  tryPostImage = async (img) => {
    const resp = await fetcher.form(`https://testapi.alephpay.com/api/kyc/image/${this.id}`, img)
    const json = await resp.json()
    console.log('---', json)
  }

  @action
  tryLogin = async (email, password) => {
    const body = {
      email, password
    }
    const resp = await fetcher.post('https://testapi.alephpay.com/api/user', body)
    const json = await resp.json()

    if (json.status === 200) this.data = { user: json }
  }

  @action
  validateCard = async () => {
    const body = toJS(this.data)
    const resp = await fetcher.post('https://testapi.alephpay.com/api/kyc/validate', body)
    const json = await resp.json()

    console.log('---', json)
  }

  @action
  mergeData = (data) => {
    const newData = Object.assign(toJS(this.data), data)
    this.data = newData
  }

  @computed get userData() {
    return toJS(this.data)
  }

  @computed get id(){
    return this.data?.user?.id || false
  }
}

export let userStore = new UserStore()
