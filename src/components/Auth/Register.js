import React, { Component } from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { observable } from "mobx"
import { inject, observer } from "mobx-react"

import matchEmail from 'utils/matchEmail'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import Field from 'UI/Field'
import Button from 'UI/Button'
import WithLoaded from 'UI/WithLoaded'

const LoginWrapper = styled.div`
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

@inject('userStore')
@observer
class Register extends Component {
  @observable email = ''
  @observable emailError = null

  @observable password = ''
  @observable passwordError = null
  @observable ispasswordVisible = false

  @observable cPassword = ''
  @observable cPasswordError = null
  @observable iscPasswordVisible = false

  @observable justRegistered = false

  componentDidUpdate(){
    const { userStore, history } = this.props
    if(userStore.id && this.justRegistered) history.push('/login' )
  }

  handleFieldChange = e => {
    const fieldName = e.currentTarget.name
    this[fieldName] = e.currentTarget.value
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}Error`] = false
  }

  setPassVisible = fieldName => () => {
    this[`is${fieldName}Visible`] = true
  }
  setPassInvisible = fieldName => () => {
    this[`is${fieldName}Visible`] = false
  }

  tryRegister = () => {
    const { userStore } = this.props
    let isError = false

    //Sure we should validate these on server but....
    if (!matchEmail(this.email))          { isError = true; this.emailError = "It isn't email" }
    if (this.email === '')                { isError = true; this.emailError = "Shouldn't be empty" }
    if (!(this.password.match(/[0-9]/) && this.password.match(/[a-zA-Z]/))) { isError = true; this.passwordError = "Should at least one letter and number" }
    if (this.password === '')             { isError = true; this.passwordError = "Shouldn't be empty" }
    if (this.cPassword === '')            { isError = true; this.cPasswordError = "Shouldn't be empty" }
    if (this.password !== this.cPassword) { isError = true; this.cPasswordError = "Do not match" }

    if (!isError) {
      userStore.tryRegister(this.email, this.password, this.cPassword)
      this.justRegistered = true
    }
  }

  render() {
    const { userStore } = this.props
    if (userStore.id) return <Redirect to='/login' />

    return (
      <WithLoaded>
        <Typography as="h3">Register</Typography>
        <Field
          name='email'
          placeholder='your@email.com'
          label='Email'
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.emailError}
        />
        <Field
          name='password'
          placeholder='Type here anything you want but not too long'
          label='Password'
          type={this.ispasswordVisible ? 'text' : 'password'}
          value={this.password}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.passwordError}
          icon={
            <FontAwesomeIcon onMouseDown={this.setPassVisible('password')} onMouseUp={this.setPassInvisible('password')} icon={['fal', 'eye']}/>
          }
        />
        <Field
          name='cPassword'
          placeholder='Type here the same as password'
          label='Confirm password'
          type={this.iscPasswordVisible ? 'text' : 'password'}
          value={this.cPassword}
          onChange={this.handleFieldChange}
          onFocus={this.handleFieldFocus}
          error={this.cPasswordError}
          icon={
            <FontAwesomeIcon onMouseDown={this.setPassVisible('cPassword')} onMouseUp={this.setPassInvisible('cPassword')} icon={['fal', 'eye']}/>
          }
        />
        <BottomButtons>
          <Button onClick={this.tryRegister}>REGISTER</Button>
          <LoginWrapper>
            Already have an account? <Link to='/login'><StyledTypo>Login</StyledTypo></Link>
          </LoginWrapper>
        </BottomButtons>
        {/*{error && <Message status='error' content={error.message} />}*/}
      </WithLoaded>
    )
  }
}

export default Register
