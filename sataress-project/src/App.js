import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, []);
  //console.log(user);
  return (
    <div className="App">
      {user ? <Home user={user}/> : <Login/> }
    </div>
  );
}

export default App;