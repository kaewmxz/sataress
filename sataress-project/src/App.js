import React, { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null || window.localStorage.getItem('user') === 'user');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
      window.localStorage.setItem('user','user');
    })
  }, []);

  return (
    <div className="App">
      {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;