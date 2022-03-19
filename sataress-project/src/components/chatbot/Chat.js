import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "./style.css";
import Messages from "./Messages";
import { Grid, Container, Box } from "@material-ui/core";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import Button from '@mui/material/Button';

let replyMap = new Map();
let mood = [];
let intensity = [];

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
  font-family: Noto Sans,Kanit,sans-serif;
`);

const CBT = withTheme(styled.div`
  position: relative;
  margin-top: -19px;
  margin-left: 265px;
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
      userId : currentUser.uid,
    };
    console.log(data)
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

  // const extractReply = (reply) => {
  //   if (reply.action == "Greeting.Greeting-custom") {
  //     replyMap["activity"] = reply.parameters.fields.activty.stringValue;
  //   } else if (reply.action == "Greeting.Greeting-custom.Tendtobehappy-yes") {
  //     replyMap["mood"] = "happy";
  //   } else if (
  //     reply.action ==
  //     "Greeting.Greeting-custom.Tendtobehappy-yes.Happy-yes-custom"
  //   ) {
  //     replyMap["intensity"] = reply.parameters.fields.number.numberValue;
  //   } else if (
  //     reply.action ==
  //     "Greeting.Greeting-custom.Tendtobehappy-yes.Happy-yes-custom.Happy-thoughts-custom"
  //   ) {
  //     const date = new Date();
  //     const dateTime = [
  //       date.getMonth() + 1,
  //       date.getDate().toString(),
  //       date.getFullYear().toString(),
  //     ];
  //     replyMap["thoughts"] = reply.queryText;
  //     replyMap["date"] = dateTime.join("/");
  //     replyMap["id"] = currentUser.uid;
  //     axios
  //       .post("http://localhost:4000/mood-result", replyMap)
  //       .catch((error) => {
  //         console.log("Error: ", error);
  //       });
  //   } else {
  //   }
  // };

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
    } else if (reply.action == "Rate") {
      if (reply.parameters.fields.number.numberValue < 1){
        reply.parameters.fields.number.numberValue = 1;
        intensity.push(reply.parameters.fields.number.numberValue);
      }
      else if (reply.parameters.fields.number.numberValue > 10){
        reply.parameters.fields.number.numberValue = 10;
        intensity.push(reply.parameters.fields.number.numberValue);
      }
      else{
        intensity.push(reply.parameters.fields.number.numberValue);
      }
    } else if (reply.action == "End") {
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
    replyMap['mood'] = mood;
    replyMap['intensity'] = intensity;
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
      <Bg />
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" direction="column">
          <Head>
            <img
              src="../image/transparent_bg.png"
              width={70}
              style={{ marginLeft: -215, marginTop: 15, position: "relative" }}
            />
            <Text>Nong Krati</Text>
            <Link to="/">
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
                placeholder="Say something..."
                className="messageInputField"
              />
              <Button onClick={handleSubmit}
                value={currentMessage}
                endIcon={<SendIcon sx={{ marginRight: 2 }}
                color="pink"></SendIcon>}>
              </Button>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Chat;
