import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import theme from 'UI/theme'

const ContainerBody = styled.div`
  margin: 0 auto;
  width: 420px;
  padding: 0 ${theme.interval} ${theme.interval} ${theme.interval};
`

export default class Container extends Component {
  render() {
    return (
      <ContainerBody>
        {this.props.children}
      </ContainerBody>
    )
  }
}

