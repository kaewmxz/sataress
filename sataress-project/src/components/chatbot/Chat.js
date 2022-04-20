import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "./style.css";
import Messages from "./Messages";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

let replyMap = new Map();
let mood = [];
let intensity = [];
let dict = {};

const theme = createTheme({
  palette: {
    gray: {
      main: "#757575",
    },
    pink: {
      main: "#FF8080",
    },
  },
});

const Bg = withTheme(styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 189, 189, 0.3) 0%,
    rgba(254, 68, 10, 0.3) 44.27%
  );
  backdrop-filter: blur(4px);
`);

const Head = withTheme(styled.div`
  position: relative;
`);

const Text = withTheme(styled.div`
  position: relative;
  font-size: 22px;
  margin-top: -44px;
  margin-left: -50px;
  font-family: Noto Sans, Kanit, sans-serif;
`);

const CBT = withTheme(styled.div`
  position: relative;
  margin-top: -19px;
  margin-left: 265px;
`);

const random = Math.random().toString();
function timeout(delay) {
  return new Promise((res) => setTimeout(res, delay));
}
const Chat = () => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [disabled, setDisabled] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const sessionId = currentUser.uid + random;
  console.log(sessionId);
  useEffect(() => {
    replyMap = new Map();
    mood = [];
    intensity = [];
    handleMessageSubmit("บันทึกอารมณ์");
  }, []);

  const handleMessageSubmit = async (message) => {
    const data = {
      message,
      userId: sessionId,
    };
    console.log(data);
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
        await timeout(100);
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
    if (reply.action == "Activity") {
      replyMap["activity"] = reply.parameters.fields.any.stringValue;
    } else if (reply.action == "Happy") {
      mood.push("Happy");
    } else if (reply.action == "Sad") {
      mood.push("Sad");
    } else if (reply.action == "Fearful") {
      mood.push("Fearful");
    } else if (reply.action == "Disgusted") {
      mood.push("Disgusted");
    } else if (reply.action == "Surprised") {
      mood.push("Surprised");
    } else if (reply.action == "Angry") {
      mood.push("Angry");
    } else if (reply.action == "Neutral") {
      mood.push("Neutral");
    } else if (reply.action == "Stressed") {
      mood.push("Stressed");
    } else if (reply.action == "Sad-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Happy-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Stressed-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Fearful-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Disgusted-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Neutral-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Angry-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "Surprised-Rate") {
      intensity.push(parseInt(reply.parameters.fields.number.stringValue));
    } else if (reply.action == "End") {
      setDisabled(true);
      const date = new Date();
      const dateTime = [
        date.getMonth() + 1,
        date.getDate().toString(),
        date.getFullYear().toString(),
      ];
      replyMap["thoughts"] = reply.queryText;
      replyMap["date"] = dateTime.join("/");
      replyMap["dateToCheck"] = date;
      replyMap["id"] = currentUser.uid;
      axios
        .post("http://localhost:4000/mood-result", replyMap)
        .catch((error) => {
          console.log("Error: ", error);
        });
    } else {
    }
    if (intensity.length > mood.length) {
      intensity.splice(intensity.length - 2, 1);
    }
    if (mood.length - intensity.length > 1) {
      mood.splice(mood.length - 2, 1);
    }

    for (let i = 0; i < mood.length; i++) {
      dict[[mood[i]]] = intensity[i];
    }

    replyMap["mood"] = Object.keys(dict);
    replyMap["intensity"] = Object.values(dict);
  };

  const handleSubmit = async (event) => {
    if (currentMessage != "") {
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
    }
  };

  const handleClick = async () => {
    if (currentMessage != "") {
      const message = {
        text: currentMessage,
        isBot: false,
      };
      let reply;
      setResponses((responses) => [...responses, message]);
      setCurrentMessage("");
      reply = await handleMessageSubmit(message.text);
      extractReply(reply);
      console.log(replyMap);
    }
  };

  return (
    <div>
      <Bg />
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" direction="column">
          <Head>
            <img
              src="../image/transparent_bg.avif"
              width={70}
              style={{ marginLeft: -215, marginTop: 15, position: "relative" }}
            />
            <Text>Nong Krati</Text>
            <Link
              to="/"
              onClick={() =>
                setTimeout(() => {
                  window.location.reload(false);
                }, 0.05)
              }
            >
              <CBT>
                <CancelIcon sx={{ fontSize: 15 }} color="gray" />
              </CBT>
            </Link>
          </Head>
        </Grid>
        <div className="chatSection">
          <div className="botContainer">
            <div className="messagesContainer">
              <Messages messages={responses} />
            </div>

            {/*The input section is 👇*/}
            <div className="inputSection">
              <input
                type="text"
                value={currentMessage}
                onChange={handleMessageChange}
                onKeyDown={handleSubmit}
                disabled={disabled}
                placeholder="Say something..."
                className="messageInputField"
              />
              <Button
                onClick={handleClick}
                // value={currentMessage}
                endIcon={
                  <SendIcon sx={{ marginRight: 2 }} color="pink"></SendIcon>
                }
              ></Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Chat;
