import React, { Component } from 'react'
import styled from 'styled-components'

import ListItem from 'UI/List/ListItem'

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
`

export default class List extends Component {
  render() {
    const { className=null } = this.props
    return (
      <StyledList className={className}>
        {this.props.children}
      </StyledList>
    )
  }
}

List.Item = ListItem
