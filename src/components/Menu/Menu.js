import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import logo from 'assets/logo.png'

import theme from 'UI/theme'
import Img from 'UI/Img'
import List from 'UI/List'

const StyledMenu = styled.aside`
  margin-top: ${theme.interval};
  padding: ${theme.interval};
`

const SharedStyleForLinks = css`
  font-size: 2em;
  color: ${theme.dark};
  padding-left: 33%;
  border-left: 4px solid transparent;
  &:hover {
    color: ${theme.light};
  }
`

const StyledList = styled(List)`
  margin-top: ${theme.multiInterval(3)};
`

const StyledItem = styled(List.Item)`
  margin-top: ${theme.interval};
`

const StyledLink = styled.a`
  ${SharedStyleForLinks}
`

const StyledNavLink = styled(NavLink)`
  ${SharedStyleForLinks}
  position: relative;
  &:after {
      transform: translateY(${props => props.index === 0 ? '43px' : '-43px'}); //There is cheatcode here... Actually we should define previous position
      display: block;
      content: '';
      width: 4px;
      height: 100%;
      background: ${theme.dark};
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: all 200ms ease-in-out;
    }
  &.active {
    color: ${theme.dark};
    &:after {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`

@observer
export default class Menu extends Component {
  render() {
    return (
      <StyledMenu>
        <Link to='/'><Img src={logo} alt='Kimaia logo' width='103' height='60' /></Link>
        <StyledList>
          <StyledItem><StyledNavLink to='/feed' index={0}><FontAwesomeIcon icon={['fal', 'newspaper']} /></StyledNavLink></StyledItem>
          <StyledItem><StyledNavLink to='/users' index={1}><FontAwesomeIcon icon={['fal', 'user-friends']} /></StyledNavLink></StyledItem>
          <StyledItem><StyledLink href="https://github.com/Leerat/social_with_server"><FontAwesomeIcon icon={['fab', 'github']} /></StyledLink></StyledItem>
        </StyledList>
      </StyledMenu>
    )
  }
}
