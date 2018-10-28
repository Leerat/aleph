import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from "mobx-react"
import { observable } from 'mobx'

const LoadedComponent = styled.div`
  transition: all 300ms ease-in-out;
  opacity: ${props => props.loaded ? '1' : '0.01'};
  transform: translateX(${props => props.loaded ? '0' : '-25px'});
`

class WithLoaded extends Component {
  @observable loaded = false
  componentDidMount () {
      setTimeout(()=>this.loaded=true, 0)
  }
  render() {
    return (
      <LoadedComponent loaded={this.loaded} {...this.props} />
    )
  }
}

export default observer(WithLoaded)
