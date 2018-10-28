import React from 'react'
import styled from 'styled-components'

//Here should be default styles for variants
const dict = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  span: 'span',
  text: 'span',
  paragraph: 'p',
  div: 'div'
}

const Typography = ({className, as='span', ...props}) => {
  const Component = dict[as]
  return <Component className={className} {...props} />
}

export default Typography
