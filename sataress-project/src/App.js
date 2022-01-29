import React, { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
        auth.onAuthStateChanged(user=> {
          setUser(user);
          setLoad(false)
      })
  //console.log(user);
  }, []);
 
  return (
<<<<<<< HEAD
      <div className="App">
        {user ? <Home user={user} /> : <Login />}
      </div>
=======
    <div className="App">
      { user ? <Home user={user} /> : <Login />}
    </div>
>>>>>>> 083a47c97cf1ed983cfe58f9d41c498c542d7d29
  );
}

export default App;