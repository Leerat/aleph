import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import Img from 'UI/Img'
import logo from 'assets/logo.png'

const Logo = styled.div`
  margin: 75px 0 25px;
  text-align: center;
`

@observer
class Layout extends Component {
  render() {
    return (
      <div>
        <Logo>
          <Link to='/'><Img src={logo} widht="148" height="45" /></Link>
        </Logo>
          {this.props.children}
      </div>
    )
  }
}

export default Layout
