import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { inject, observer } from "mobx-react"

import Container from 'UI/Container'

import Layout from 'components/Layout'
import PrivateArea from 'components/PrivateArea'
import Home from 'components/Home'
import { Login, Register } from 'components/Auth'
import Card from 'components/Card'
import User from 'components/User'
import Address from 'components/Address'
import Finish from 'components/Finish'

const Routes = inject('userStore')(observer( ({userStore}) => {
   return (
     <Container>
       <Switch>
         <Layout>
           <Route exact path="/" component={Home} />
           <Route path="/login" component={Login} />
           <Route path="/register" component={Register} />
           <Route path="/card" component={Card} />
           <Route path="/user" component={User} />
           <Route path="/address" component={Address} />
           <Route path="/finish" component={Finish} />
           {/*<PrivateArea isAuthenticated={authStore.token}>*/}
           {/*</PrivateArea>*/}
         </Layout>
       </Switch>
     </Container>
   )
  })
)

export default Routes
