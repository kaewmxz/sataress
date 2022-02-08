import React, {useContext} from 'react';
import { AuthContext } from './Auth';
import { Routes, Route, Navigate} from 'react-router-dom';
import Home from './Home';

function Landpage() {
    const { currentUser } = useContext(AuthContext);
    if (!currentUser) {
        return (
          <Routes>
            <Route path ="/" element={<Navigate replace to ="/"/>}></Route>
          </Routes>
        )
      }
  return <Home/>;
}

export default Landpage;
