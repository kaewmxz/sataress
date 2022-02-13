import React, {useContext} from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import { AuthContext } from "./Auth";



const Interventions = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path ="/" element={<Navigate replace to ="/"/>}></Route>
      </Routes>
    )
  }
  return (
    <div className="Interventions">
      <center>Hi, this is calendar page.</center>
    </div>
  );
};
export default Interventions;


