import { getAuth } from 'firebase/auth'
import React, { useState, useEffect }  from 'react';
import Login from './components/Login';
import Home from './components/Home';

function App() {

  const [user, setUser] = useState(null);

  useEffect(() => {
    getAuth().onAuthStateChanged(user => {
      setUser(user)
    })
  }, []);
  console.log(user);
  return (
    <div className="app">
      {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;