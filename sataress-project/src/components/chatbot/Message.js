import React from "react";
import "./style.css";

const Message = ({ message }) => {
  return (
    <div className="messageCard">
      {message.isBot ? (
        <div className="botCard">
          <p
            style={{
              textAlign:"left",
              paddingLeft: "16px",
              paddingRight: "10px",
              fontFamily: 'Noto Sans,Kanit,sans-serif',
              fontWeight: 100
            }}
          >
            {message.text}
          </p>
        </div>
      ) : (
        <div className="userCard">
          <p
            style={{
              textAlign:"right",
              paddingLeft: "16px",
              paddingRight: "10px",
              fontFamily: 'Noto Sans,Kanit,sans-serif',
              fontWeight: 100
            }}
          >
            {message.text}
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
