import React, { Component } from 'react'
import styled from 'styled-components'

const StyledListItem = styled.ul`
  padding: 0;
`

export default class ListItem extends Component {
  render() {
    const { className } = this.props
    return (
      <StyledListItem className={className}>
        {this.props.children}
      </StyledListItem>
    )
  }
}
