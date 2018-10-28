import React, { Component } from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter as Router } from 'react-router-dom'
import { inject, observer } from "mobx-react"
import { createGlobalStyle, ThemeProvider } from 'styled-components'

import theme from 'UI/theme'

const GlobalStyle = createGlobalStyle`
 * {
    box-sizing: border-box;
    outline: none;
  }
  html {
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    background: 
    url("img/left_bottom.png") left bottom no-repeat,
    url("img/right_bottom.png") right bottom no-repeat,
    url("img/right_top.png") right top no-repeat, 
    //linear-gradient(135deg, rgba(215,230,255,1) 0%, rgba(243,219,246,1) 50%, rgba(240,220,247,1) 55%, rgba(217,227,255,1) 100%);
    rgba(10,187,181,0.1);
    color: ${theme.color};
  }
  body {
    
  }
  a {
    text-decoration: none;
  }
`

// Wrapper for hrm
import Routes from 'Routes'

@observer
class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <GlobalStyle />
          <Routes />
        </Router>
      </ThemeProvider>
    )
  }
}

export default hot(module)(App)
