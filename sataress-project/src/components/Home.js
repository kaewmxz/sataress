import React from 'react';

import { auth } from '../services/firebase'

const Home = ({ user }) => {
  var name = user.displayName;
  var uid = user.uid;
  return (
    <div className="home">
      <h1>Hello, <span></span>{name}</h1>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  )
}

export default Home;