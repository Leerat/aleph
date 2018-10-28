import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'
import { observable } from 'mobx'
import format from 'date-fns/format'

import theme from "UI/theme"
import Typography from 'UI/Typography'

const StyledPost = styled.div`
  border-radius: 16px;
  background: linear-gradient(135deg, #fff 66%,#fae4d6 100%);
  margin: ${theme.multiInterval(1.5)} 0;
  transition: all 300ms ease-in-out;
  opacity: ${props => props.loaded ? 1 : 0.01};
  transform: translateY(${props => props.loaded ? 0 : '25px'});
  overflow: hidden;
  position: relative;
  box-shadow: 0px 16px 25px 0px rgba(118, 88, 198, 0.1);
  padding: ${theme.interval};
`

const StyledTypo = styled(Typography)`
  font-size: 19px;
  color: ${theme.color};
`

const Heading = styled.div`
  font-size: 14px;
  color: #999;
`

const Content = styled.p`
  
`

const PostDate = styled.div`
  opacity: 0.6;
  font-size: 14px;
  text-align: right;
`

@observer
export default class Post extends Component {
  @observable loaded

  componentDidMount () {
    const { index } = this.props
    setTimeout(()=>this.loaded = true, (index||0)*50)
  }

  render() {
    const { post } = this.props

    return (
      <StyledPost loaded={this.loaded}>
        <Heading>
          <StyledTypo as='span'>{`${post.authorName.firstname} ${post.authorName.lastname}`}</StyledTypo> writes
        </Heading>
        <Content>
          {post.text}
        </Content>
        <PostDate>
          {format(post.createdAt, 'DD MMM [at] H:mm')}
        </PostDate>
      </StyledPost>
    )
  }
}
