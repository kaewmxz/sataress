import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navigation from './Navigation';

function App() {

  const [user, setUser] = useState(null || window.localStorage.getItem('user') === 'user');

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user);
      window.localStorage.setItem('user','user');
    })
  }, []);
  console.log(user);

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
      </BrowserRouter>
      <div className="App">
        {user ? <Home user={user} /> : <Login />}
      </div>
    </div>
  );
}

export default App;