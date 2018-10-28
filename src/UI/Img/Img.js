import React, { Component } from 'react'

// Should be lazy loading here
export default class Img extends Component {
  render() {
    const { src='', alt='', width='auto', height='auto'} = this.props

    return (
      <img src={src} alt={alt} width={width} height={height}/>
    )
  }
}
