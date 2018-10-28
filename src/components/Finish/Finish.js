import React, { Component } from 'react'
import styled from 'styled-components'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import WithLoaded from 'UI/WithLoaded'

const StyledTypo = styled(Typography)`
  text-align: center;
`

class Finish extends Component {
  render() {
    return (
      <WithLoaded>
        <StyledTypo as='h1'>User registered!</StyledTypo>
      </WithLoaded>
    )
  }
}

export default Finish
