import React, {useContext} from "react";
import { AuthContext } from "./Auth";
import "./chatbot/style.css"
import Chat from "./chatbot/Chat"

const Moodtrack = () => {
  const { currentUser } = useContext(AuthContext);
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
