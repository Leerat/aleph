import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'
import { Link } from 'react-router-dom'

import Radio from '@material-ui/core/Radio'

import theme from 'UI/theme'
import WithLoaded from 'UI/WithLoaded'
import Typography from 'UI/Typography'
import Field, { Two } from 'UI/Field'
import Button from 'UI/Button'

const BottomButtons = styled.div`
  margin-top: ${theme.multiInterval(2)};
`

const BackWrapper = styled.div`
  float: right;
`

const StyledLink = styled(Link)`
  font-size: 120%;
  text-decoration: underline;
`

const Image = styled.div`
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: ${theme.interval};
  #file {
    display: none;
  }
`

@inject('userStore')
@observer
class User extends Component {
  @observable firstname = ''
  @observable lastname = ''
  @observable gender = ''
  @observable birthDate = ''
  @observable idNumber = ''
  @observable countryCode = ''
  @observable phone = ''
  @observable occupation = ''

  @observable firstnameError = ''
  @observable lastnameError = ''
  @observable genderError = ''
  @observable birthDateError = ''
  @observable idNumberError = ''
  @observable countryCodeError = ''
  @observable phoneError = ''
  @observable occupationError = ''
  @observable idImageError = ''

  handleGender = e => {
    this.gender = e.currentTarget.value
    this.genderError = false
  }

  handleBirthDate = e => {
    const birthDate = e.currentTarget.value
    // const last = birthDate[birthDate.length-1]
    // if (last.match(/\d/) && birthDate.length < 11) {
    //   if (birthDate.length === 2 || birthDate.length === 5) {
    //     this.birthDate = birthDate + ' '
    //   } else {
    //     this.birthDate = birthDate
    //   }
    // } else {
    //   return false
    // }
    this.birthDate = birthDate.replace(/([_]|\s|[/])/g, '')
  }

  handleField = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}`] = e.currentTarget.value
  }

  handleFieldNumber = e => {
    const input = e.currentTarget.value
    const last = input[input.length-1]
    if (last.match(/\d/)) {
      const fieldName = e.currentTarget.name
      this[`${fieldName}`] = input
    }
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}Error`] = false
  }

  handleFile = () => {
    this.idImageError = ''
    document.getElementById('file').click()
  }

  tryNext = () => {
    const { history, userStore } = this.props
    let isError = false
    const file = document.getElementById('file').files[0]

    //Sure we should validate these on server but....
    if (this.firstname === '')    { isError = true; this.firstnameError = "Shouldn't be empty" }
    if (this.lastname === '')     { isError = true; this.lastnameError = "Shouldn't be empty" }
    if (this.gender === '')       { isError = true; this.genderError = "Shouldn't be empty" }
    if (this.birthDate === '')    { isError = true; this.birthDateError = "Shouldn't be empty" }
    if (this.idNumber === '')     { isError = true; this.idNumberError = "Shouldn't be empty" }
    if (this.countryCode === '')  { isError = true; this.countryCodeError = " " }
    if (this.phone === '')        { isError = true; this.phoneError = " " }
    if (this.occupation === '')   { isError = true; this.occupationError = "Shouldn't be empty" }
    if (!file)               { isError = true; this.idImageError = "Shouldn't be empty" }

    if (!isError) {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        gender: this.gender,
        birthDate: this.birthDate,
        idNumber: this.idNumber,
        countryCode: this.countryCode,
        phone: this.phone,
        occupation: this.occupation
      }
      userStore.tryPostImage(file)
      userStore.mergeData(data)
      history.push('/address')
    }
  }

  render() {
    return (
      <WithLoaded>
        <Typography as='h3'>User registration</Typography>
        <Field
          name='firstname'
          placeholder='Hi, that is you name?'
          label='Firstname'
          value={this.firstname}
          onChange={this.handleField}
          onFocus={this.handleFieldFocus}
          error={this.firstnameError}
        />
        <Field
          name='lastname'
          placeholder='And surname?'
          label='Lastname'
          value={this.lastname}
          onChange={this.handleField}
          onFocus={this.handleFieldFocus}
          error={this.lastnameError}
        />
        <Field
          name='gender'
          label='Gender'
          error={this.genderError}
        >
          Male
          <Radio
            checked={this.gender === 'male'}
            onChange={this.handleGender}
            value="male"
            name="radio-button-demo"
            aria-label="male"
          />
          Female
          <Radio
            checked={this.gender === 'female'}
            onChange={this.handleGender}
            value="female"
            name="radio-button-demo"
            aria-label="female"
          />
        </Field>
        <Field
          name='birthDate'
          placeholder='DD MM YYYY'
          mask='99 99 9999'
          label='Birthdate'
          value={this.birthDate}
          onChange={this.handleBirthDate}
          onFocus={this.handleFieldFocus}
          error={this.birthDateError}
        />
        <Field
          name='idNumber'
          placeholder='1234567890'
          label='Id number'
          value={this.idNumber}
          onChange={this.handleField}
          onFocus={this.handleFieldFocus}
          error={this.idNumberError}
        />
        <Two>
          <Field
            name='countryCode'
            placeholder='0'
            label='Country code'
            value={this.countryCode}
            onChange={this.handleFieldNumber}
            onFocus={this.handleFieldFocus}
            error={this.countryCodeError}
          />
          <Field
            name='phone'
            placeholder='5555552'
            label='Phone'
            value={this.phone}
            onChange={this.handleFieldNumber}
            onFocus={this.handleFieldFocus}
            error={this.phoneError}
          />
        </Two>
        <Field
          name='occupation'
          placeholder='That is your job?'
          label='Occupation'
          value={this.occupation}
          onChange={this.handleField}
          onFocus={this.handleFieldFocus}
          error={this.occupationError}
        />
        <Field
          label='Id image'
          error={this.idImageError}
        >
          <Image>
            <Button onClick={this.handleFile}>UPLOAD ID IMAGE</Button>
            <input id='file' type="file" accept=".jpg, .jpeg, .png" />
          </Image>
        </Field>
        <BottomButtons>
          <Button onClick={this.tryNext}>NEXT</Button>
          <BackWrapper>
            Some mistake? <StyledLink to='/card'>Go back</StyledLink>
          </BackWrapper>
        </BottomButtons>
      </WithLoaded>
    )
  }
}

export default User
