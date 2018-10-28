import React from 'react'
import { render } from 'react-dom'
import { Provider as MobxProvider } from 'mobx-react'
import 'externals/normalize.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faNewspaper, faUserFriends, faEye } from '@fortawesome/pro-light-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
library.add(faNewspaper, faUserFriends, faGithub, faEye)

import App from 'App'
import storeMobx from 'storeMobx'

render(
  <MobxProvider {...storeMobx}>
    <App />
  </MobxProvider>,
  document.getElementById('root')
)
