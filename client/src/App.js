import React from 'react'
import "./App.css";
import Quora from './components/Quora';
import { Route } from 'react-router-dom';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/logout';
import QuraProfile from './components/profile/quraProfile';
import Search from './components/search/Search';

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" >
        <Quora />
      </Route>

      <Route path="/profile" >
        <QuraProfile />
      </Route>

      <Route path="/search" >
        <Search />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Signup />
      </Route>

      <Route path="/logout">
        <Logout />
      </Route>
    </div>
  )
}

export default App