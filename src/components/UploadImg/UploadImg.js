import React, { Component } from 'react'
import styled from 'styled-components'
import { observer, inject } from 'mobx-react'
import { observable } from 'mobx'

import theme from 'UI/theme'
import Typography from 'UI/Typography'
import WithLoaded from 'UI/WithLoaded'
import Button from 'UI/Button'
import Field from 'UI/Field'


const Image = styled.div`
  text-align: center;
  border-bottom: 1px solid #333;
  padding-bottom: ${theme.interval};
  #file {
    display: none;
  }
`

const file = document.getElementById('file').files[0]

@inject('userStore')
@observer
class UploadImg extends Component {
  @observable idImageError = ''

  handleFile = () => {
    this.idImageError = ''
    document.getElementById('file').click()
  }

  render() {
    return (
      <WithLoaded>
        <Field
          label='Id image'
          error={this.idImageError}
        >
          <Image>
            <Button onClick={this.handleFile}>UPLOAD ID IMAGE</Button>
            <input id='file' type="file" accept=".jpg, .jpeg, .png" />
          </Image>
        </Field>
        <BottomButtons>
          <Button onClick={this.tryNext}>NEXT</Button>
          <BackWrapper>
            Some mistake? <StyledLink to='/card'>Go back</StyledLink>
          </BackWrapper>
        </BottomButtons>
      </WithLoaded>
    )
  }
}

export default UploadImg
