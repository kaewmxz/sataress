import React, {useContext} from "react";
import { AuthContext } from "./Auth";
import "./chatbot/style.css"
import Chat from "./chatbot/Chat"
import { Routes, Route, Navigate} from 'react-router-dom';

const Moodtrack = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path ="/" element={<Navigate replace to ="/"/>}></Route>
      </Routes>
    )
  }

  return (
    <div className="Chatbot">
      <center>
        <Chat />
      </center>

      <></>
    </div>
  );
};
export default Moodtrack;
