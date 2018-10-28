import React, { Component } from 'react'
import styled, { css } from 'styled-components'

import theme from "UI/theme";
import Typography from 'UI/Typography'

const StyledMessage = styled.div`
  margin-top: ${theme.multiInterval(2)};
  text-align: center;
  ${props => props.status === 'error' && css`color: ${theme.red}`}
  ${props => props.status === 'success' && css`color: ${theme.green}`}
  transition: all 200ms ease-in-out;
  opacity: ${props => props.loaded ? '1': '0.01'};
  transform: translateY(${props => props.loaded ? '0': '25px'});
`

class Message extends Component {
  state = {loaded: false}
  componentDidMount () {
    setTimeout(()=>this.setState({loaded: true}), 0)
  }
  render(){
    const { content, status } = this.props
    return (
      <StyledMessage loaded={this.state.loaded} status={status}><Typography as='h4'>{content}</Typography></StyledMessage>
    )
  }
}

export default Message
