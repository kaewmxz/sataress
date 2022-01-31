import React, {useContext} from "react";
import "./style.css";
import Chat from "./Chat"
import { AuthContext } from "./Auth";

const Moodtrack = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="Chatbot">
      <center>
        Hi, this is moodtrack page.<br/>
        <Chat />
      </center>
    </div>
  );
};
export default Moodtrack;
