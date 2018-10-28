import React from 'react'
import styled from 'styled-components'
import theme from "../theme";

const StyledTwo = styled.div`
display: flex;
  justify-content: space-between;
  margin: ${theme.interval} 0;
  > div {
    flex: 0 0 47%;
    margin: 0;
  }
`
const Two = props => <StyledTwo {...props} />
export default Two
