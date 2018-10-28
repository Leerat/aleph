import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'

import theme from 'UI/theme'
import Typography from 'UI/Typography'

const HeaderBody = styled.div`
  margin-top: ${theme.interval};
  padding: ${props => props.theme.interval} 0;
`

const StyledTypo = styled(Typography)`
  font-size: 19px;
  font-weight: 500;
`

@inject('authStore')
@observer
class Header extends Component {
  render() {
    const { authStore } = this.props
    const id = authStore.ownerId || 'hmmmmm....'
    const firstname = authStore.userData?.firstname || 'Stranger'

    return (
      <HeaderBody>
        <StyledTypo>Hi, {firstname}! Your number is {id}</StyledTypo>
      </HeaderBody>
    )
  }
}

export default Header
