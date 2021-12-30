import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import './App.css';
import Login from './components/Login';
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, []);
  console.log(user);
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;