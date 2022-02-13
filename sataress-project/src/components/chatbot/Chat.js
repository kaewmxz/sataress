import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "./style.css";
import Messages from "./Messages";
import { Grid } from '@material-ui/core';
import Box from '@mui/material/Box';
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import Avatar from "@mui/material/Avatar";
import DoDisturbOnSharpIcon from "@mui/icons-material/DoDisturbOnSharp";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";

let replyMap = new Map();
const theme = createTheme({
  palette: {
    gray: {
      main: "#757575",
    },
    pink: {
      main: "#f06292",
    },
  },
});

const Bg = withTheme(styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 217px;
z-index:-1;
background: linear-gradient(180deg, rgba(254, 68, 10, 0) 17.83%, #FFBDBD 95.83%);
`);

const ChatHeader = withTheme(styled.div`
  height: 80px;
  background: rgba(255, 189, 189, 0.6);
  ${(props) => props.theme.breakpoints.up("xs")} {
    width: 375px;
    border-radius: 20px 20px 0px 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 450px;
    border-radius: 20px 20px 0px 0px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
    border-radius: 20px 20px 0px 0px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 600px;
    border-radius: 20px 20px 0px 0px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    width: 700px;
    border-radius: 20px 20px 0px 0px;
  }
`);

const BotProfile = withTheme(styled.div`
  position: absolute;
  left: 25px;
  top: 15px;
`);

const BotName = withTheme(styled.div`
  position: absolute;
  width: 30vw;
  top: 20px;
  left: 45px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  color: #a6a6a6;
  line-height: 41px;
`);

const Closebutton = withTheme(styled.div`
  position: absolute;
  top: 30px;
  left: 320px;
`);


const ChatSection = withTheme(styled.div`
  position: relative;
  z-index: -1;
  background: #ffffff;
  transition: 0.3s; 
  border-radius: 20px;
  ${(props) => props.theme.breakpoints.up("xs")} {
    width: 375px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 450px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 600px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    width: 700px;
  }
`);

const ChatBottom = withTheme(styled.div`
  position: relative;
  width: 375px;
  height: 65px;
  background: rgba(255, 189, 189, 0.6);
  border-radius: 0px 0px 20px 20px;
  ${(props) => props.theme.breakpoints.up("xs")} {
    width: 375px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    width: 450px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    width: 500px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 600px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    width: 700px;
  }
`);

const SendButton = withTheme(styled.div`
  position: absolute;
  left: 340px;
  top: 20px;
`);

const Chat = () => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    handleMessageSubmit("บันทึกอารมณ์");
  }, []);

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
      const date = new Date();
      const dateTime = [
        date.getMonth() + 1,
        date.getDate().toString(),
        date.getFullYear().toString(),
      ];
      replyMap["thoughts"] = reply.queryText;
      replyMap["date"] = dateTime.join("/");
      replyMap["id"] = currentUser.uid;
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
    <div>
    <Bg/>
    <Box sx = {{justifyContent: "center"}}>
      <ChatSection style = {{justifyContent:"center", alignItems:"center"}}>
        <ChatHeader>
          <BotProfile>
            <Avatar sx={{ width: 50, height: 50 }}>
              <img src="./image/plogo.png" width="52px" />
            </Avatar>
          </BotProfile>
          <BotName>Nong Krati</BotName>
          <ThemeProvider theme={theme}>
            <Closebutton>
              <Link to="/">
                <DoDisturbOnSharpIcon sx={{ width: 15 }} color="gray" />
              </Link>
            </Closebutton>
          </ThemeProvider>
        </ChatHeader>
        <div className="messagesContainer">
          <Messages messages={responses} />
          {/*The input section is 👇*/}
          <ChatBottom>
            <input
              type="text"
              value={currentMessage}
              onChange={handleMessageChange}
              onKeyDown={handleSubmit}
              placeholder="  Say something..."
              className="messageInputField"
            />
            <div onTap={handleSubmit}>
              <ThemeProvider theme={theme}>
                <SendButton>
                  <SendIcon color="pink">
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
                  </SendIcon>
                </SendButton>
              </ThemeProvider>
            </div>
          </ChatBottom>
        </div>
      </ChatSection>
      </Box>
      </div>
  );
};

export default Chat;
