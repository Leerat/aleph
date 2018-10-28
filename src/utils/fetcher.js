const fetcher = {
  fetch(url, customOptions) {
    const headers = new Headers({
      'Accept': 'application/json',
      "Content-Type": "application/json; charset=utf-8"
    })
    const options = {
      headers,
      ...customOptions
    }
    return fetch(url, options)
  },
  get(url, customOptions){
    const options = {
      method: 'GET',
      ...customOptions
    }
    return this.fetch(url, options)
  },
  post(url, body, customOptions={}){
    const options = {
      method: 'POST',
      body: JSON.stringify(body || customOptions.body || {}),
      ...customOptions
    }
    return this.fetch(url, options)
  },
  put(url, body, customOptions={}){
    const options = {
      method: 'PUT',
      body: JSON.stringify(body || customOptions.body || {}),
      ...customOptions
    }
    return this.fetch(url, options)
  },
  form(url, body, customOptions={}){
    const file = new FormData()
    file.append('image', body)

    const options = {
      method: 'POST',
      headers: {},
      body: file,
      ...customOptions
    }
    return this.fetch(url, options)
  }
}

export default fetcher
