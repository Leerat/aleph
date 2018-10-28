import React, { Component } from 'react'
import styled from 'styled-components'
import { observable} from "mobx"
import { inject, observer } from "mobx-react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'

import matchEmail from 'utils/matchEmail'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import Field from 'UI/Field'
import Button from 'UI/Button'
import Message from 'UI/Message'
import WithLoaded from 'UI/WithLoaded'

const RegisterWrapper = styled.div`
  padding-top: ${theme.multiInterval(0.5)};
  float: right;
`

const BottomButtons = styled.div`
  margin-top: ${theme.multiInterval(2)};
`

const StyledTypo = styled(Typography)`
  font-size: 120%;
  text-decoration: underline;
`

class Login extends Component {
  @observable email = ''
  @observable emailError = null

  @observable password = ''
  @observable passwordError = null
  @observable isPassVisible = false

  //Not sure about this, mb should store error in local state
  componentWillUnmount(){
    const { userStore } = this.props
    userStore.error = null
  }

  handleFieldChange = e => {
    const fieldName = e.currentTarget.name
    this[fieldName] =  e.currentTarget.value
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}Error`] = false
  }

  setPassVisible = () => {
    this.isPassVisible = true
  }
  setPassUnvisible = () => {
    this.isPassVisible = false
  }

  tryLogin = () => {
    const { userStore } = this.props
    let isError = false

    //Sure we should validate these on server
    if (!matchEmail(this.email)) { isError = true; this.emailError = "It isn't email" }
    if (this.email === '')       { isError = true; this.emailError = "Shouldn't be empty" }
    if (this.password === '')    { isError = true; this.passwordError = "Shouldn't be empty" }

    if (!isError) {
      userStore.tryLogin(this.email, this.password)
    }
  }

  render() {
    const { userStore } = this.props
    if (userStore.id) return <Redirect to='/card' />

    return (
      <WithLoaded>
        <Typography as="h3">Login</Typography>
        <Field
          name='email'
          placeholder='your@email.com'
          label='Email'
          value={this.email}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.emailError}
        />
        <Field
          name='password'
          placeholder='Type a few ***'
          label='Password'
          type={this.isPassVisible ? 'text' : 'password'}
          value={this.password}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.passwordError}
          icon={
            <FontAwesomeIcon onMouseDown={this.setPassVisible} onMouseUp={this.setPassUnvisible} icon={['fal', 'eye']}/>
          }
        />
        <BottomButtons>
          <Button onClick={this.tryLogin}>LOGIN</Button>
          <RegisterWrapper>
            Don't have an account? <Link to='/register'><StyledTypo>Register</StyledTypo></Link>
          </RegisterWrapper>
        </BottomButtons>
        {userStore.error && <Message content={userStore.error} status='error'/>}
        {/*{ false && <Message content={'Registration successful'} status='success'/>}*/}
      </WithLoaded>
    )
  }
}

export default inject('userStore')(observer(Login))
