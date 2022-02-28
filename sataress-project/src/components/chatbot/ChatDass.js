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
import { Routes, Route, Navigate } from "react-router-dom";
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

const Chat = () => {
  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    if (!currentUser) {
      return (
        <Routes>
          <Route path="/" element={<Navigate replace to="/" />}></Route>
        </Routes>
      );
    }
    handleMessageSubmit("ประเมิน");
  }, []);

  const handleMessageSubmit = async (message) => {
    const data = {
      message,
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
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["1"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["1"] = 0;
      }
    } else if (reply.action == "3") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["2"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["2"] = 0;
      }
    } else if (reply.action == "4") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["3"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["3"] = 0;
      }
    } else if (reply.action == "5") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["4"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["4"] = 0;
      }
    } else if (reply.action == "6") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["5"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["5"] = 0;
      }
    } else if (reply.action == "7") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["6"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["6"] = 0;
      }
    } else if (reply.action == "8") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["7"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["7"] = 0;
      }
    } else if (reply.action == "9") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["8"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["8"] = 0;
      }
    } else if (reply.action == "10") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["9"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["9"] = 0;
      }
    } else if (reply.action == "11") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["10"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["10"] = 0;
      }
    } else if (reply.action == "12") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["11"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["11"] = 0;
      }
    } else if (reply.action == "13") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["12"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["12"] = 0;
      }
    } else if (reply.action == "14") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["13"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["13"] = 0;
      }
    } else if (reply.action == "15") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["14"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["14"] = 0;
      }
    } else if (reply.action == "15end") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["15"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["15"] = 0;
      }
      handleMessageSubmit("โอเค");
    } else if (reply.action == "17") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["16"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["16"] = 0;
      }
    } else if (reply.action == "18") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["17"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["17"] = 0;
      }
    } else if (reply.action == "19") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["18"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["18"] = 0;
      }
    } else if (reply.action == "20") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["19"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["19"] = 0;
      }
    } else if (reply.action == "21") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["20"] = reply.parameters.fields.number.numberValue;
      } else {
        replyMap["20"] = 0;
      }
    } else if (reply.action == "end") {
      if (reply.parameters.fields.number.kind != "stringValue") {
        replyMap["21"] = reply.parameters.fields.number.numberValue;
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
  const theme = createTheme({
    palette: {
      Black: {
        main: "#212121",
      },
      Pink: {
        main: "#f8bbd0",
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
              src="../image/transparent_bg.png"
              width={70}
              style={{ marginLeft: -215, marginTop: 5, position: "relative" }}
            />
            <Text>Nong Krati</Text>
            <Link to="/">
              <CBT>
                <CancelIcon sx={{ fontSize: 15 }} color="Black" />
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
              <div onTap={handleSubmit}>
                <SendIcon sx={{ marginRight: 2 }}>
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
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};
export default Chat;
