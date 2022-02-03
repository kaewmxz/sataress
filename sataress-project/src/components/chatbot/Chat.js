import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Timestamp } from "firebase/firestore";

import "./style.css";
import Messages from "./Messages";

import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import DoDisturbOnSharpIcon from "@mui/icons-material/DoDisturbOnSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let replyMap = new Map();
const theme = createTheme({
  palette: {
    gray: {
      main: "#757575",
    },
  },
});

const Bg = withTheme(styled.div`
position: absolute;
width: 100vw;
height: 100vh;
background: linear-gradient(
  180deg,
  rgba(255, 189, 189, 0.3) 0%,
  rgba(254, 68, 10, 0.3) 44.27%
);
backdrop-filter: blur(4px);
background
`);

const ChatHeader = withTheme(styled.div`
  width: 375px;
  height: 100px;
  left: 0px;
  top: 0px;
  background: rgba(255, 189, 189, 0.6);
  border-radius: 20px 20px 0px 0px;
`);

const BotProfile = withTheme(styled.div`
  position: absolute;
  left: 320px;
  top: 25px;
`);

const BotName = withTheme(styled.div`
  position: absolute;
  width: 30vw;
  top: 5px;
  left: -30px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #a6a6a6;
  line-height: 41px;
`);

const Closebutton = withTheme(styled.div`
  position: absolute;
  top: 38px;
  left: 610px;
`);

const ChatSection = withTheme(styled.div`
  position: relative;
  z-index: -1;
  width: 375px;
  height: 812px;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  border-radius: 20px;
`);

const ChatBottom = withTheme(styled.div`
  position: absolute;
  width: 375px;
  height: 89px;
  left: 0px;
  top: 723px;
  background: rgba(255, 189, 189, 0.6);
  border-radius: 0px 0px 20px 20px;
`);

const Chat = (props) => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageSubmit = async (message) => {
    const data = {
      message,
    };
    try {
      const response = await axios.post(
        "http://localhost:4000/moodtrack",
        data
      );
      for (
        let i = 0;
        i < response.data["message"]["fulfillmentMessages"].length;
        i++
      ) {
        const responseData = {
          text: response.data.message.fulfillmentMessages[i].text.text,
          isBot: true,
        };
        setResponses((responses) => [...responses, responseData]);
      }
      return response.data.message;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const extractReply = (reply) => {
    if (reply.action == "Greeting.Greeting-custom") {
      replyMap["activity"] = reply.parameters.fields.activty.stringValue;
    } else if (reply.action == "Greeting.Greeting-custom.Tendtobehappy-yes") {
      replyMap["mood"] = "happy";
    } else if (
      reply.action ==
      "Greeting.Greeting-custom.Tendtobehappy-yes.Happy-yes-custom"
    ) {
      replyMap["intensity"] = reply.parameters.fields.number.numberValue;
    } else if (
      reply.action ==
      "Greeting.Greeting-custom.Tendtobehappy-yes.Happy-yes-custom.Happy-thoughts-custom"
    ) {
      replyMap["thoughts"] = reply.queryText;
      replyMap["date"] = Timestamp.now();
      replyMap["uid"] = props.uid;
      axios
        .post("http://localhost:4000/mood-result", replyMap)
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
    }
  };

  const handleSubmit = async (event) => {
    const message = {
      text: currentMessage,
      isBot: false,
    };
    let reply;
    if (event.key == "Enter") {
      setResponses((responses) => [...responses, message]);
      setCurrentMessage("");
      reply = await handleMessageSubmit(message.text);
      extractReply(reply);
      console.log(replyMap);
    }
  };

  return (
    <Bg>
      <ChatHeader>
        <BotProfile>
          <Avatar sx={{ width: 50, height: 50 }}>
            <img src="./image/plogo.png" width="52px" />
          </Avatar>
          <BotName>Nong Krati</BotName>
        </BotProfile>
        <Closebutton>
          <ThemeProvider theme={theme}>
            <Link to="/">
              <DoDisturbOnSharpIcon sx={{ width: 15 }} color="gray" />
            </Link>
          </ThemeProvider>
        </Closebutton>
      </ChatHeader>
      <ChatSection>
        <div className="messagesContainer">
          <Messages messages={responses} />
          {/*The input section is 👇*/}
          <ChatBottom>
            <input
              type="text"
              value={currentMessage}
              onChange={handleMessageChange}
              onKeyDown={handleSubmit}
              placeholder="Say something..."
              className="messageInputField"
            />
            <div onTap={handleSubmit}>
              <svg
                style={{ marginRight: "10px" }}
                id="Capa_1"
                enableBackground="new 0 0 512.004 512.004"
                height="25"
                viewBox="0 0 512.004 512.004"
                width="25"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
                    fill="#94dfda"
                  />
                  <path
                    d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
                    fill="#61a7c5"
                  />
                  <path
                    d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
                    fill="#eef4ff"
                  />
                  <path
                    d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
                    fill="#d9e6fc"
                  />
                </g>
              </svg>
            </div>
          </ChatBottom>
        </div>
      </ChatSection>
    </Bg>
  );
};

export default Chat;
