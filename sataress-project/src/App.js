<<<<<<< HEAD
import React from 'react';
import './App.css';
import Login from './components/login';
=======
import { getAuth } from 'firebase/auth'
import React, { useState, useEffect }  from 'react';
import Login from './components/Login';
import Home from './components/Home';

>>>>>>> 3b07fc5932c39c81521f3d0dae643ada14f47c1d
function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, []);
  console.log(user);
  return (
<<<<<<< HEAD
    <div className="App">
      <Login />
=======
    <div className="app">
      {user ? <Home user={user} /> : <Login />}
>>>>>>> 3b07fc5932c39c81521f3d0dae643ada14f47c1d
    </div>
  );
}

export default App;