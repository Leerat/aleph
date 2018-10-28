import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import theme from 'UI/theme'
import WithLoaded from 'UI/WithLoaded'
import Typography from 'UI/Typography'
import Field, { Two } from 'UI/Field'
import Button from 'UI/Button'

import Img from 'UI/Img'

import logo from 'assets/logo_white.png'
import mc from 'assets/mc.png'

const CreditCard = styled.div`
  background:#262626;
  height: 248px;
  width: 395px;
  border-radius: 14px;
  padding: ${theme.multiInterval(2)};
  color: white;
  position: relative;
  margin-bottom: ${theme.multiInterval(2)};
`

const Logo = styled.div`
  // margin-top: ${theme.interval};
`

const Number = styled.div`
  font-size: 1.8em;
  margin-top: 1em;
`

const Expiry = styled.div`
  font-size: 1.3em;
  position: absolute;
  left: ${theme.multiInterval(2)};
  bottom: ${theme.multiInterval(2)};
`

const MC = styled.div`
  position: absolute;
  right: ${theme.multiInterval(2)};
  bottom: ${theme.multiInterval(2)};
`

const CreditCardWrapper = () => (
  <CreditCard>
    <Logo>
      <Img src={logo} />
    </Logo>
    <Number>
      XXXX XXXX XXXX XXXX
    </Number>
    <Expiry>
      <div>
        EXPIRY:
      </div>
      <div>
        00 / 00
      </div>
    </Expiry>
    <MC>
      <Img src={mc} height='70' />
    </MC>
  </CreditCard>
)

const BottomButtons = styled.div`
  margin-top: ${theme.multiInterval(2)};
`

@inject('userStore')
@observer
class Card extends Component {
  @observable cardNumber = ''
  @observable expiryDate = ''
  @observable cvv = ''
  @observable pin = ''
  @observable cpin = ''

  @observable cardNumberError = false
  @observable expiryDateError = false
  @observable cvvError = false
  @observable pinError = false
  @observable cpinError = false

  handleNumber = e => {
    const number = e.currentTarget.value
    this.cardNumber = number.replace(/([_]|\s)/g, '')
  }

  handleExpiry = e => {
    const expiry = e.currentTarget.value
    // const last = expiry[expiry.length-1]
    // if (last.match(/\d/) && expiry.length < 8) {
    //   if (expiry.length === 2) {
    //     this.expiry = expiry + ' / '
    //   } else {
    //     this.expiry = expiry
    //   }
    // } else {
    //   return false
    // }
    this.expiryDate = expiry.replace(/([_]|\s|[/])/g, '')
  }

  handleCvv = e => {
    const cvv = e.currentTarget.value
    this.cvv = cvv.replace(/([_]|\s)/g, '')
  }

  handlePin = e => {
    const fieldName = e.currentTarget.name
    const pin = e.currentTarget.value
    const last = pin[pin.length-1]

    if ( (pin === '' || last.match(/\d/)) && pin.length < 5) {
      this[`${fieldName}`] = pin
    } else {
      return false
    }
  }

  handleFieldFocus = e => {
    const fieldName = e.currentTarget.name
    this[`${fieldName}Error`] = false
  }

  tryActivate = () => {
    const { history, userStore } = this.props
    let isError = false

    //Sure we should validate these on server but....
    if (this.cardNumber === '' || this.cardNumber.length < 16) { isError = true; this.cardNumberError = " " }
    if (this.expiryDate === '' || this.expiryDate.length < 4)  { isError = true; this.expiryDateError = " " }
    if (this.cvv === '' || this.cvv.length < 3)        { isError = true; this.cvvError = " " }
    if (this.pin !== this.cpin)                        { isError = true; this.cpinError = "Do not match" }
    if (this.pin === '' || this.pin.length < 4)        { isError = true; this.pinError = " " }
    if (this.cpin === '' || this.cpin.length < 4)      { isError = true; this.cpinError = " " }

    if (!isError) {
      const data = {
        cardNumber: this.cardNumber,
        expiryDate: this.expiryDate,
        cvv: this.cvv,
        pin: this.pin,
        cpin: this.cpin
      }
      userStore.mergeData(data)
      history.push('/user')
    }
  }

  render() {
    return (
      <WithLoaded>
        <Typography as='h3'>Activate card</Typography>
        <CreditCardWrapper />
        <Field
          name='number'
          placeholder='1234 5678 1234 5678'
          mask='9999 9999 9999 9999'
          label='Card number'
          value={this.cardNumber}
          onChange={this.handleNumber}
          onFocus={this.handleFieldFocus}
          error={this.cardNumberError}
        />
        <Two>
          <Field
            name='expiry'
            placeholder='MM / YY'
            mask='99 / 99'
            label='Expary date'
            value={this.expiryDate}
            onChange={this.handleExpiry}
            onFocus={this.handleFieldFocus}
            error={this.expiryDateError}
          />
          <Field
            name='cvv'
            placeholder='123'
            mask='999'
            label='CVV'
            value={this.cvv}
            onChange={this.handleCvv}
            onFocus={this.handleFieldFocus}
            error={this.cvvError}
          />
        </Two>
        <Two>
          <Field
            name='pin'
            placeholder='1234'
            label='New pin'
            type='password'
            value={this.pin}
            onChange={this.handlePin}
            onFocus={this.handleFieldFocus}
            error={this.pinError}
          />
          <Field
            name='cpin'
            placeholder='1234'
            label='Confirm pin'
            type='password'
            value={this.cpin}
            onChange={this.handlePin}
            onFocus={this.handleFieldFocus}
            error={this.cpinError}
          />
        </Two>
        <BottomButtons>
          <Button onClick={this.tryActivate}>NEXT</Button>
        </BottomButtons>
      </WithLoaded>
    )
  }
}

export default Card
