import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
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
  position: relative;
  margin: 1px;
  width: 304px;
  background: #ffffff;
  border: 17px solid #ffeeb5;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
`);

const CalendarCard2 = withTheme(styled.div`
  position: relative;
  margin: 1px;
  width: 304px;
  background: #ffffff;
  border: 17px solid #b0d9ff;
  box-sizing: border-box;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
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
      <Grid container justifyContent="center">
        <CalendarCard>
          <CalendarCardInnerCircle>
            <img
              src="../image/cali.avif"
              width="20"
              style={{ marginTop: 3, marginLeft: 4 }}
            />
          </CalendarCardInnerCircle>
          <CalendarCardInnerDate>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              style={{ marginLeft: 12, fontWeight: "bold", color: "black" }}
            >
              {date}
            </Typography>
          </CalendarCardInnerDate>
          <Grid item style={{ marginTop: 55, marginLeft: 30 }}>
            <Typography variant="body2" color="text.primary">
              Activity:{activity}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Mood:{" "}
              {mood.map((data) => (
                <li>{data}</li>
              ))}
              {/* {mood + ""} */}
            </Typography>
            <Typography variant="body2" color="text.primary">
              Thoughts:{thoughts}
            </Typography>
            <br />
          </Grid>
          <CalendarCardDot1 />
          <CalendarCardDot2 />
          <CalendarCardDot3 />
        </CalendarCard>
      </Grid>
    </ThemeProvider>
  );
};

const GratitudeInfo = (gratitude) => {
  if (gratitude.length) {
    return (
      <ThemeProvider theme={theme}>
        <Grid container justify="center">
          <CalendarCard2>
            <CalendarCardInnerCircle>
              <img
                src="../image/book.avif"
                width="20"
                style={{ marginTop: 3, marginLeft: 4 }}
              />
            </CalendarCardInnerCircle>
            <CalendarCardInnerDate>
              <Typography
                gutterBottom
                variant="h6"
                component="div"
                style={{
                  marginLeft: 12,
                  fontWeight: "bold",
                  color: "black",
                  fontSize: 15,
                }}
              >
                {/* {date} */}Gratitude List
              </Typography>
            </CalendarCardInnerDate>
            <Grid item style={{ marginTop: 55, marginLeft: 30 }}>
              <Typography variant="body2" color="text.primary">
                {gratitude.map((data) => (
                  <li>{data}</li>
                ))}
              </Typography>
              <br />
            </Grid>
            <CalendarCardDot1 />
            <CalendarCardDot2 />
            <CalendarCardDot3 />
          </CalendarCard2>
        </Grid>
      </ThemeProvider>
    );
  }
};

const Log = () => {
  const { currentUser } = useContext(AuthContext);
  // For mood logs
  const [data, setData] = useState([]);
  // For gratitude logs
  const [data2, setData2] = useState([]);
  const location = useLocation();
  let navigate = useNavigate();

  const handleClick = () => {
    console.log("error");
    navigate("/Calendar");
  };

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
      //For mood logs
      const fetchLogs = async () => {
        try {
          const result = await axios.get("https://backend-glint.herokuapp.com/mood-logs", {
            params: { id: currentUser.uid, date: location.state.date },
          });
          console.log(result.data.message);
          setData(result.data.message);
        } catch (err) {
          console.log(err);
        }
      };
      fetchLogs();
    }
    //For gratitude
    const fetchGratitude = async () => {
      try {
        const result = await axios.get("https://backend-glint.herokuapp.com/gratitude-logs", {
          params: { id: currentUser.uid, date: location.state.date },
        });
        setData2(result.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    fetchGratitude();
  }, []);

  console.log(data2);
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }

  // For mood logs
  let rows = [];
  try {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].mood.length; j++) {
        if (data[i].mood[j] == "Happy") {
          data[i].mood[j] = "มีความสุข😊";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Sad") {
          data[i].mood[j] = "เศร้า😭";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Stressed") {
          data[i].mood[j] = "เครียด😣";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Surprised") {
          data[i].mood[j] = "ประหลาดใจ😯";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Fearful") {
          data[i].mood[j] = "หวาดกลัว😰";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Disgusted") {
          data[i].mood[j] = "รังเกียจ🤢";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Neutral") {
          data[i].mood[j] = "เฉยๆ😶";
          data[i].mood[j] = data[i].mood[j] + "(" + data[i].intensity[j] + ")";
        } else if (data[i].mood[j] == "Angry") {
          data[i].mood[j] = "โกรธ😡";
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
      <Grid container justify="center">
        <img
          src="../image/backicon.avif"
          onClick={() => handleClick()}
          width="22"
          style={{
            marginTop: 160,
            marginLeft: -165,
            position: "absolute",
            cursor: "pointer",
          }}
        />
      </Grid>
      <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
      {data.map((data, id) => (
        <Grid item xs={12} style={{ marginTop: 10 }}>
          <MoodInfo key={id} {...data} />
        </Grid>
      ))}
      <Grid item xs={12} style={{ marginTop: 10, marginBottom: 100 }}>
        {GratitudeInfo(data2)}
      </Grid>
      <BottomNavigationBar />
    </div>
  );
};
export default Log;
