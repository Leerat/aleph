import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import theme from 'UI/theme'

const StyledButton = styled.button`
  transition: all 500ms ease-in-out;
  background: ${props => props.basic ? 'transparent': theme.main};
  border: ${props => props.basic ? `1px solid ${theme.main}`: '0'};
  color: ${({basic, color}) => basic ? (color ? theme[color] : theme.main): 'white'};
  padding: ${theme.multiInterval(0.75)} ${theme.multiInterval(2)};
  border-radius: ${theme.borderRadius};
  cursor: pointer;
  opacity: 0.8;
`

const Button = observer(props => <StyledButton {...props}>{props.children || props.content}</StyledButton>)
export default Button
