import React, { Component } from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h3`
  
`

export default class Title extends Component {
  render() {
    return (
      <StyledTitle>
        {this.props.children}
      </StyledTitle>
    )
  }
}
