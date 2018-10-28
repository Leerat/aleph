import React, { Component } from 'react'
import styled from 'styled-components'
import theme from 'UI/theme'

const BlockBody = styled.div`
  background: #fff;
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: ${theme.interval};
`

export default class Block extends Component {
  render() {
    return (
      <BlockBody>
        {this.props.children}
      </BlockBody>
    )
  }
}
