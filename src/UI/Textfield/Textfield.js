import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import theme from 'UI/theme'

const StyledTextfield = styled.textarea`
  width: 100%;
  resize: none;
  border: 0;
  border-radius: 16px;
  padding: ${theme.interval};
  transition: all 300ms ease-in-out;
  height: 42px;
  &:focus {
    height: 10em;
  }
  overflow: auto;
`

const Textfield = props => <StyledTextfield {...props} rows='1' />

// class Textfield extends Component {
//   render() {
//     return (
//       <div>
//
//       </div>
//     )
//   }
// }

export default Textfield
