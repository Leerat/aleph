import React, { Component } from 'react'
import styled from 'styled-components'

const StyledAuth = styled.div`
  //width: 66%;
  //margin: 25% auto 0 auto;
  transition: all 200ms ease-in-out;
  opacity: ${props => props.loaded ? '1' : '0.01'};
  transform: translateX(${props => props.loaded ? '0' : '-25px'});
`

class Auth extends Component {

  // We should write HOC WithLoaded
  state={loaded:false}
  componentDidMount () {
    setTimeout(()=>this.setState({loaded: true}), 0)
  }

  render() {
    return (
      <StyledAuth loaded={this.state.loaded} {...this.props} />
    )
  }
}

// const Auth = props => <StyledAuth {...props} />
export default Auth
