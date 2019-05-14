import React, { Fragment, Component } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom' 

import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/navigation/MainNavigation'
import AuthContext from './context/auth-context'
import './App.css'

class App extends Component {

  state = {
    token: null,
    userId: null
  }
  
  login = (token, userId, tokenExpiration) => {
    this.setState({ token, userId })
    localStorage.setItem('jwtToken', token) 
    console.log(localStorage)
  }

  logout = () => {
    this.setState({ token: null, userId: null })
  }

  render() {
    const { token, userId } = this.state 
    return (
      <BrowserRouter>
        <Fragment>
          <AuthContext.Provider value={{ 
            token, 
            userId, 
            login: this.login, 
            logout: this.logout 
          }}>
            <MainNavigation />
            <main className='main-content'>
              <Switch>
                { token && <Redirect from='/' to='/events' exact/>}
                { token && <Redirect from='/auth' to='/events' exact/>}
                { !token && <Route path='/auth' component={AuthPage} />}
                <Route path='/events' component={EventsPage} />
                { token && <Route path='/bookings' component={BookingsPage} />}
                { !token && <Redirect to='/auth' exact/>}
              </Switch>
            </main>
          </AuthContext.Provider>
        </Fragment>
      </BrowserRouter>
    )
  }
}

export default App
