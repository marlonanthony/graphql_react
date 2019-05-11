import React, { Fragment } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom' 

import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/navigation/MainNavigation'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Fragment>
        <MainNavigation />
        <main className='main-content'>
          <Switch>
            <Redirect from='/' to='/auth' exact/>
            <Route path='/auth' component={AuthPage} />
            <Route path='/events' component={EventsPage} />
            <Route path='/bookings' component={BookingsPage} />
          </Switch>
        </main>
      </Fragment>
    </BrowserRouter>
  )
}

export default App