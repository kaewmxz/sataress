import React, { useState, useEffect } from 'react';
import { auth } from './services/firebase';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
<<<<<<< HEAD

=======
>>>>>>> aae1983249b263e3bfbc9cf73920e1e5ba78e080

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
<<<<<<< HEAD
 
=======

>>>>>>> aae1983249b263e3bfbc9cf73920e1e5ba78e080
  return (
    <div className="App">
      { user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;