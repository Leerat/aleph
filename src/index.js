import React from 'react'
import { render } from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import 'externals/normalize.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'

// import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faEye } from '@fortawesome/free-regular-svg-icons'
library.add(faEye)

import App from 'App'
import storeMobx from 'storeMobx'

render(
  <MobxProvider {...storeMobx}>
    <App />
  </MobxProvider>,
  document.getElementById('root')
)
