import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Bg = withTheme(styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 217px;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(254, 68, 10, 0) 17.83%,
    #ffbdbd 95.83%
  );
`);

const CalendarCardDot1 = withTheme(styled.div`
  position: absolute;
  top: -12px;
  left: 245px;
  height: 6px;
  width: 6px;
  background-color: #6ec177;
  border-radius: 50%;
  display: inline-block;
`);

const CalendarCardDot2 = withTheme(styled.div`
  position: absolute;
  top: -12px;
  left: 260px;
  height: 6px;
  width: 6px;
  background-color: #e8b83f;
  border-radius: 50%;
  display: inline-block;
`);

const CalendarCardDot3 = withTheme(styled.div`
  position: absolute;
  top: -12px;
  left: 275px;
  height: 6px;
  width: 6px;
  background-color: #ff5e5e;
  border-radius: 50%;
  display: inline-block;
`);

const CalendarCard = withTheme(styled.div`
<<<<<<< HEAD
  position: absolute;
  margin: 1px;
  width: 304px;
  height: 210px;
  background: #ffffff;
  border: 17px solid #ffeeb5;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
=======
position:absolute;
margin:1px;
width: 304px;
background: #FFFFFF;
border: 17px solid #FFEEB5;
box-sizing: border-box;
box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
>>>>>>> 9a98e3efb552f88ff7fc66f07331ca9721109669
`);

const CalendarCardInnerCircle = withTheme(styled.div`
  position: absolute;
  width: 34px;
  height: 34px;
  left: 15px;
  top: 10px;
  background: #ffffff;
  border: 3px solid #5ec0c7;
  border-radius: 50%;
  box-sizing: border-box;
`);

const CalendarCardInnerDate = withTheme(styled.div`
  position: absolute;
  width: 120px;
  height: 28px;
  left: 60px;
  top: 14px;
  background: #5ec0c7;
  opacity: 0.25;
  border: 1px solid #5ec0c7;
  box-sizing: border-box;
`);

// const CalendarCardBottom = withTheme(styled.div`
// position: absolute;
// top:193px;
// left:-17px;
// width: 304px;
// height: 35px;
// background: #B0D9FF;
// `);

// const CalendarCardDot4 = withTheme(styled.div`
// position:absolute;
// top:5px;
// left:40px;
// height: 26px;
//   width: 26px;
//   background: #FFFFFF;
//   border-radius: 50%;
//   display: inline-block;
//   `);

// const CalendarCardLine1 = withTheme(styled.div`
//   position: absolute;
//   width: 70px;
//   height:0px;
//   left: 110px;
//   top: 15px;
  
//   border: 4px solid #FFFFFF;
//   `);
// const CalendarCardLine2 = withTheme(styled.div`
//   position: absolute;
//   width: 70px;
//   height: 0px;
//   left: 188px;
//   top:15px;
  
//   border: 4px solid #FF5858;
//   `);

const theme = createTheme({
  components: {
    // Name of the component
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Noto Sans,Kanit,sans-serif",
        },
      },
    },
  },
});

const MoodInfo = (props) => {
  const { mood, thoughts, activity, date } = props;
  return (
    <ThemeProvider theme={theme}>
      <Grid container justify="center" style={{ marginBottom: 40 }}>
        <CalendarCard>
          <CalendarCardInnerCircle>
            <img
              src="../image/cali.png"
              width="20"
              style={{ marginTop: 3, marginLeft: 4 }}
            />
          </CalendarCardInnerCircle>
          <CalendarCardInnerDate>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ marginLeft: 15, fontWeight: "bold", color: "black" }}
            >
              {date}
            </Typography>
          </CalendarCardInnerDate>
          <Grid item style={{ marginTop: 55, marginLeft: 30 }}>
            <Typography variant="body2" color="text.primary">
              Activity:{activity}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Mood:{mood + ""}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Thoughts:{thoughts}
            </Typography>
            <br/>
          </Grid>
        <CalendarCardDot1 />
        <CalendarCardDot2 />
        <CalendarCardDot3 />
      {/* <CalendarCardBottom>
        <img src="../image/play-buttonbackward.png" width="12"
        style={{ marginLeft:18, marginTop: 12 }} />
        <CalendarCardDot4>
          <img src="../image/pause.png" width="12" 
          style={{ marginLeft: 7, marginTop: 7 }} />
        </CalendarCardDot4>
        <img src="../image/play-button.png" width="12" 
        style={{ marginLeft: 46, marginTop: 12 }}/>
        <CalendarCardLine1 />
        <CalendarCardLine2 />
      </CalendarCardBottom> */}
      </CalendarCard>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
    </Grid>
    </ThemeProvider>
  );
};

const Log = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();

  function createData(date, activity, moods, intensities, thought) {
    return {
      date,
      activity,
      moods,
      intensities,
      thought,
    };
  }

  useEffect(() => {
    if (currentUser) {
      const fetchLogs = async () => {
        try {
          const result = await axios.get("http://localhost:4000/mood-logs", {
            params: { id: currentUser.uid, date: location.state.date },
          });
          setData(result.data.message);
        } catch (err) {
          console.log(err);
        }
      };
      fetchLogs();
    }
  }, []);

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }

  let rows = [];
  try {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].mood.length; j++) {
        if (data[i].mood[j] == "Happy") {
          data[i].mood[j] = "Happy😊";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Sad") {
          data[i].mood[j] = "Sad😭";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Stressed") {
          data[i].mood[j] = "Stressed😣";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Surprised") {
          data[i].mood[j] = "Surprised😯";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Fearful") {
          data[i].mood[j] = "Fearful😰";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Disgusted") {
          data[i].mood[j] = "Disgusted🤢";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Neutral") {
          data[i].mood[j] = "Neutral😶";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Angry") {
          data[i].mood[j] = "Angry😡";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        }
      }
      rows.push(
        createData(
          data[i].date,
          data[i].activity,
          data[i].mood,
          data[i].thoughts
        )
      );
    }
  } catch (err) {
    // console.log(err);
  }
  return (
    <div>
      <Bg />
      <Head />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {data.map((data, id) => (
        <MoodInfo key={id} {...data} />
      ))}
      <br />
      <br />
      <br />
      <br />
      <br />
      <BottomNavigationBar />
    </div>
  );
};
export default Log;
