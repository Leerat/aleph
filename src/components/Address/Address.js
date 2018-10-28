import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { observer, inject } from 'mobx-react'
import { observable, action } from 'mobx'
import Select from 'react-select'
import { Link } from "react-router-dom"

import theme from 'UI/theme'
import WithLoaded from 'UI/WithLoaded'
import Typography from 'UI/Typography'
import Field, { Two } from 'UI/Field'
import Message from 'UI/Message'
import Button from 'UI/Button'

import fetcher from 'utils/fetcher'

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


const styles = {
  control: (base) => ({
    ...base,
    background: 'transparent',
    border: '0 !important',
    boxShadow: 'none',
    padding: '0',
    borderBottom: '1px solid #333 !important',
    borderRadius: '0',
  }),
  valueContainer: (base) => ({
    ...base,
    padding: '0',
  }),
  indicatorSeparator: (base) => ({
    display: 'none'
  })
}

@inject('userStore')
@observer
class Address extends Component {
  @observable country = ''
  @observable countryId = ''
  @observable stateCountry = ''
  @observable stateId = ''
  @observable city = ''
  @observable zip = ''
  @observable streetName = ''

  @observable countryError = ''
  @observable countryIdError = ''
  @observable stateError = ''
  @observable stateIdError = ''
  @observable cityError = ''
  @observable zipError = ''
  @observable streetNameError = ''

  @observable countryOptions = []
  @observable stateOptions = []

  componentDidMount () {
    this.loadCountryOptions()
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

  @action
  loadCountryOptions = async () => {
    const resp = await fetcher.get('https://testapi.alephpay.com/api/geo/countries')
    const json = await resp.json()
    const options = json.map(item => ({label: item.CountryName, value: item.CountryId}))

    this.countryOptions = options
  }

  @action
  loadStateOptions = async (id) => {
    const body = {countryId: id}
    const resp = await fetcher.post('https://testapi.alephpay.com/api/geo/states', body)
    const json = await resp.json()

    this.stateOptions = json.map(item => ({label: item.StateName, value: item.StateId}))
  }

  @action
  handleCountry = input => {
    this.countryError = ''
    this.country = input.label
    this.countryId = input.value
    this.loadStateOptions(input.value)
  }

  @action
  handleState = input => {
    this.stateError = ''
    this.stateCountry = input.label
    this.stateId = input.value
  }

  tryNext = () => {
    const { userStore } = this.props
    let isError = false

    //Sure we should validate these on server but....
    if (this.country === '')    { isError = true; this.countryError = "Shouldn't be empty" }
    if (this.stateCountry === '')      { isError = true; this.stateError = "Shouldn't be empty" }
    if (this.city === '')       { isError = true; this.cityError = "Shouldn't be empty" }
    if (this.zip === '')        { isError = true; this.zipError = "Shouldn't be empty" }
    if (this.streetName === '') { isError = true; this.streetNameError = "Shouldn't be empty" }

    if (!isError) {
      const data = {
        country: this.country,
        countryId: this.countryId,
        state: this.stateCountry,
        stateId: this.stateId,
        city: this.city,
        zip: this.zip,
        streetName: this.streetName,
      }
      userStore.mergeData(data)
      setTimeout(userStore.validateCard, 500)
    }
  }

  render() {
    const { userStore } = this.props

    return (
      <WithLoaded>
        <Typography as='h3'>Address confirm</Typography>
        <Field
          name='country'
          label='Country'
          error={this.countryError}
        >
          <Select
            options={this.countryOptions}
            onChange={this.handleCountry}
            placeholder='Where you live'
            styles={styles}
          />
        </Field>
        <Field
          name='state'
          label='State'
          error={this.stateError}
        >
          <Select
            options={this.stateOptions}
            onChange={this.handleState}
            placeholder='If there is'
            styles={styles}
          />
        </Field>
        <Two>
          <Field
            name='city'
            placeholder='New-York'
            label='City'
            value={this.city}
            onChange={this.handleField}
            onFocus={this.handleFieldFocus}
            error={this.cityError}
          />
          <Field
            name='zip'
            placeholder='12345'
            label='Zip'
            value={this.zip}
            onChange={this.handleFieldNumber}
            onFocus={this.handleFieldFocus}
            error={this.zipError}
          />
        </Two>
        <Field
          name='streetName'
          placeholder='221B ‎Baker Street'
          label='Address'
          value={this.streetName}
          onChange={this.handleField}
          onFocus={this.handleFieldFocus}
          error={this.streetNameError}
        />
        <BottomButtons>
          <Button onClick={this.tryNext}>DONE</Button>
          <BackWrapper>
            Some mistake? <StyledLink to='/user'>Go back</StyledLink>
          </BackWrapper>
        </BottomButtons>
        {userStore.error && <Message status='error' content={userStore.error} />}
      </WithLoaded>
    )
  }
}

export default Address
