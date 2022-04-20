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
import PopupInformation from "./PopupInformation";
import { Routes, Route, Navigate } from "react-router-dom";
import Button from "@mui/material/Button";

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
    if (!currentUser) {
      return (
        <Routes>
          <Route path="/" element={<Navigate replace to="/" />}></Route>
        </Routes>
      );
    }

    const checkFirstTime = async () => {
      const dassFirstTime = await axios.get(
        "http://localhost:4000/dass-firstTime",
        {
          params: { id: currentUser.uid },
        }
      );
      if (dassFirstTime.data.message === "") {
        await timeout(1000);
        setResponses((responses) => [
          ...responses,
          {
            text: "สวัสดี เราชื่อกระทินะ ต่อไปนี้เธอจะคุยกับเราครั้งแรกเพื่อทำความรู้จักกัน",
            isBot: true,
          },
        ]);
      } else {
        setResponses((responses) => [
          ...responses,
          {
            text: "สวัสดี",
            isBot: true,
          },
        ]);
      }
    };

    const startChat = async () => {
      // await timeout(500);
      handleMessageSubmit("ประเมิน");
    };
    checkFirstTime();
    startChat();
    // handleMessageSubmit("ประเมิน");
  }, []);

  const handleMessageSubmit = async (message) => {
    const data = {
      message,
      userId: sessionId,
    };
    try {
      const response = await axios.post("http://localhost:4000/dass-21", data);
      for (
        let i = 0;
        i < response.data["message"]["fulfillmentMessages"].length;
        i++
      ) {
        const responseData = {
          text: response.data.message.fulfillmentMessages[i].text.text,
          isBot: true,
        };
        if (response.data.action == "1") {
          await timeout(1200);
        } else {
          await timeout(600);
        }
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
    console.log(reply);
    if (reply.action == "2") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["1"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["1"] = 0;
      }
    } else if (reply.action == "3") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["2"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["2"] = 0;
      }
    } else if (reply.action == "4") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["3"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["3"] = 0;
      }
    } else if (reply.action == "5") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["4"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["4"] = 0;
      }
    } else if (reply.action == "6") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["5"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["5"] = 0;
      }
    } else if (reply.action == "7") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["6"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["6"] = 0;
      }
    } else if (reply.action == "8") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["7"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["7"] = 0;
      }
    } else if (reply.action == "9") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["8"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["8"] = 0;
      }
    } else if (reply.action == "10") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["9"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["9"] = 0;
      }
    } else if (reply.action == "11") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["10"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["10"] = 0;
      }
    } else if (reply.action == "12") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["11"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["11"] = 0;
      }
    } else if (reply.action == "13") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["12"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["12"] = 0;
      }
    } else if (reply.action == "14") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["13"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["13"] = 0;
      }
    } else if (reply.action == "15") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["14"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["14"] = 0;
      }
    } else if (reply.action == "16") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["15"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["15"] = 0;
      }
      // handleMessageSubmit("โอเค");
    } else if (reply.action == "17") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["16"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["16"] = 0;
      }
    } else if (reply.action == "18") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["17"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["17"] = 0;
      }
    } else if (reply.action == "19") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["18"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["18"] = 0;
      }
    } else if (reply.action == "20") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["19"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["19"] = 0;
      }
    } else if (reply.action == "21") {
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["20"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["20"] = 0;
      }
    } else if (reply.action == "end") {
      setDisabled(true);
      if (
        reply.parameters.fields.number.stringValue == "0" ||
        reply.parameters.fields.number.stringValue == "1" ||
        reply.parameters.fields.number.stringValue == "2" ||
        reply.parameters.fields.number.stringValue == "3"
      ) {
        replyMap["21"] = parseInt(reply.parameters.fields.number.stringValue);
      } else {
        replyMap["21"] = 0;
      }
      const date = new Date();
      const dateTime = [
        date.getMonth() + 1,
        date.getDate().toString(),
        date.getFullYear().toString(),
      ];
      replyMap["stress"] =
        replyMap["1"] +
        replyMap["6"] +
        replyMap["8"] +
        replyMap["11"] +
        replyMap["12"] +
        replyMap["14"] +
        replyMap["18"];
      replyMap["anxiety"] =
        replyMap["2"] +
        replyMap["4"] +
        replyMap["7"] +
        replyMap["9"] +
        replyMap["15"] +
        replyMap["19"] +
        replyMap["20"];
      replyMap["depression"] =
        replyMap["3"] +
        replyMap["5"] +
        replyMap["10"] +
        replyMap["13"] +
        replyMap["16"] +
        replyMap["17"] +
        replyMap["21"];
      replyMap["date"] = dateTime.join("/");
      replyMap["id"] = currentUser.uid;
      // save result
      axios
        .post("http://localhost:4000/dass-result", replyMap)
        .catch((error) => {
          console.log("Error: ", error);
        });
      // update date in database
      try {
        axios
          .post("http://localhost:4000/bi-week-update", {
            id: currentUser.uid,
            date: date,
          })
          .catch((err) => console.log(err));
      } catch (e) {
        console.log(e);
      }
      if (replyMap["stress"] <= 7 && replyMap["stress"] >= 0) {
        replyMap["stress"] = "ปกติ";
      } else if (replyMap["stress"] <= 9 && replyMap["stress"] >= 8) {
        replyMap["stress"] = "น้อย";
      } else if (replyMap["stress"] <= 12 && replyMap["stress"] >= 10) {
        replyMap["stress"] = "ปานกลาง";
      } else if (replyMap["stress"] <= 16 && replyMap["stress"] >= 13) {
        replyMap["stress"] = "รุนแรง";
      } else if (replyMap["stress"] >= 17) {
        replyMap["stress"] = "รุนแรงอย่างมาก";
      }

      if (replyMap["anxiety"] <= 3 && replyMap["anxiety"] >= 0) {
        replyMap["anxiety"] = "ปกติ";
      } else if (replyMap["anxiety"] <= 5 && replyMap["anxiety"] >= 4) {
        replyMap["anxiety"] = "น้อย";
      } else if (replyMap["anxiety"] <= 7 && replyMap["anxiety"] >= 6) {
        replyMap["anxiety"] = "ปานกลาง";
      } else if (replyMap["anxiety"] <= 9 && replyMap["anxiety"] >= 8) {
        replyMap["anxiety"] = "รุนแรง";
      } else if (replyMap["anxiety"] >= 10) {
        replyMap["anxiety"] = "รุนแรงอย่างมาก";
      }

      if (replyMap["depression"] <= 4 && replyMap["depression"] >= 0) {
        replyMap["depression"] = "ปกติ";
      } else if (replyMap["depression"] <= 6 && replyMap["depression"] >= 5) {
        replyMap["depression"] = "น้อย";
      } else if (replyMap["depression"] <= 10 && replyMap["depression"] >= 7) {
        replyMap["depression"] = "ปานกลาง";
      } else if (replyMap["depression"] <= 13 && replyMap["depression"] >= 11) {
        replyMap["depression"] = "รุนแรง";
      } else if (replyMap["depression"] >= 14) {
        replyMap["depression"] = "รุนแรงอย่างมาก";
      }

      setResponses((responses) => [
        ...responses,
        {
          text: "ความเครียด: " + replyMap["stress"],
          isBot: true,
        },
      ]);
      setResponses((responses) => [
        ...responses,
        {
          text: " ความกังวล: " + replyMap["anxiety"],
          isBot: true,
        },
      ]);
      setResponses((responses) => [
        ...responses,
        {
          text: " ความเศร้า: " + replyMap["depression"],
          isBot: true,
        },
      ]);
    } else {
    }
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

  return (
    <div>
      <Bg />
      <ThemeProvider theme={theme}>
        <Grid container justifyContent="center" direction="column">
          <Head>
            <img
              src="../image/transparent_bg.avif"
              width={70}
              style={{ marginLeft: -215, marginTop: 5, position: "relative" }}
            />
            <Text>Nong Krati</Text>
            <Link to="/">
              <CBT>
                <CancelIcon sx={{ fontSize: 15 }} color="gray" />
              </CBT>
            </Link>
            <PopupInformation />
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
                disabled={disabled}
                onKeyDown={handleSubmit}
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
