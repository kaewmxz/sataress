import React from "react";
import "./chatbot/style.css"
import Chat from "./chatbot/Chat"
import {Link} from "react-router-dom";

const Moodtrack = () => {
  return (
    <div className="Chatbot">
       <Link to="/">
         <button>close</button>
       </Link>
      <center>
        Hi, this is moodtrack page.<br/>
        <Chat />
      </center>

      <></>
    </div>
  );
};
export default Moodtrack;
