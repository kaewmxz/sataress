import StaticDatePicker from "@mui/lab/StaticDatePicker";
import { Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BottomNavigationBar from "../BottomNavigationBar ";
import TextField from "@mui/material/TextField";
import Header from "../Head";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import React, { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AuthContext } from "../Auth";
import "./DatePicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import axios from "axios";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

const theme = createTheme({
  components: {
    // Name of the component
    MuiPickerStaticWrapper: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontFamily: 'Noto Sans,Kanit,sans-serif',
          backgroundColor: "transparent",
        },
      },
    },
    MuiCalendarPicker: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontFamily: 'Noto Sans,Kanit,sans-serif',
        },
      },
    },
    PrivatePickersFadeTransitionGroup: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          // fontFamily: '"Roboto Slab", serif, Noto Sans Thai',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "Noto Sans,Kanit,sans-serif",
        },
      },
    },
  },
});

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

export const styles = makeStyles(() => ({
  //define CSS for different date types
  notInThisMonthDayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "#eeeeee",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
  },
  normalDayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "#e8f5e9",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
  },
  selectedDayPaper: {
    width: "31px",
    height: "31px",
    backgroundColor: "#f9fbe7",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 20,
    borderStyle: "solid",
    borderWidth: "2px",
    borderColor: "lime",
    padding: "1px",
    cursor: "pointer",
  },
  todayPaper: {
    width: "35px",
    height: "35px",
    backgroundColor: "#FAB1B1",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
    color: "white",
  },
}));

const minDate = new Date("2022-01-01T00:00:00.000");
const maxDate = new Date("2022-12-31T00:00:00.000");

export default function CustomCalendar() {
  let navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const [selectedDate, setDate] = useState(new Date());
  const classes = styles(); // import those CSS
  const today = new Date(); // just Date object of today
  const sunnyDays = [1, 6, 10, 24, 15]; // array of sunny days 1st,6th etc
  let days = [];
  const [happyDay, setHappyDay] = useState([]);
  const [sadDay, setSadDay] = useState([]);
  const [stressedDay, setStressedDay] = useState([]);
  const [surprisedDay, setSurprisedDay] = useState([]);
  const [fearfulDay, setFearfulDay] = useState([]);
  const [neutralDay, setNeutralDay] = useState([]);
  const [angryDay, setAngryDay] = useState([]);
  const [disgustedDay, setDisgustedDay] = useState([]);
  const [value, setValue] = React.useState(null);
  const [show, setShow] = React.useState(true);
  // console.log(today);

  useEffect(() => {
    if (currentUser) {
      onPickerViewChange();
    }
  }, []);

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }

  const onPickerViewChange = async (date) => {
    const variables = [
      moment(date).clone().startOf("month").format("M/D/YYYY"),
      moment(date).clone().endOf("month").format("MM/D/YYYY"),
    ];

    try {
      const result = await axios.get("http://localhost:4000/mood-dates", {
        params: { id: currentUser.uid, date: variables },
      });
      setHappyDay(result.data.message.Happy.map((day) => day));
      setSadDay(result.data.message.Sad.map((day) => day));
      setStressedDay(result.data.message.Stressed.map((day) => day));
      setSurprisedDay(result.data.message.Surprised.map((day) => day));
      setFearfulDay(result.data.message.Fearful.map((day) => day));
      setNeutralDay(result.data.message.Neutral.map((day) => day));
      setAngryDay(result.data.message.Angry.map((day) => day));
      setDisgustedDay(result.data.message.Disgusted.map((day) => day));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (newDate) => {
    console.log("hey");
    setDate(newDate);
    navigate("/CalendarLogs", { state: { date: newDate } });
  };

  function getDayElement(day, selectedDate, isInCurrentMonth) {
    //generate boolean

    const isHappy = happyDay.includes(day.getDate());
    const isSad = sadDay.includes(day.getDate());
    const isStressed = stressedDay.includes(day.getDate());
    const isSurprised = surprisedDay.includes(day.getDate());
    const isFearful = fearfulDay.includes(day.getDate());
    const isDisgusted = disgustedDay.includes(day.getDate());
    const isNeutral = neutralDay.includes(day.getDate());
    const isAngry = angryDay.includes(day.getDate());
    // const isSelected = day.getDate() === selectedDate.getDate();
    const isToday =
      day.getDate() === today.getDate() && day.getMonth() === today.getMonth();
    let dateTile;
    if (show) {
      if (isInCurrentMonth.outsideCurrentMonth == false) {
        //conditionally return appropriate Element of date tile.
        if (isHappy) {
          dateTile = (
            <div
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src="/image/happy.png" width={37} height={37} />
              </Grid>
            </div>
          );
        } else if (isSad) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/sad.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isStressed) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/stressed.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isSurprised) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/surprised.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isFearful) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/fearful.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isDisgusted) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/disgusted.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isNeutral) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/neutral.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else if (isAngry) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item style={{ marginLeft: "-0.9px", marginTop: "-1px" }}>
                <img src={"/image/angry.png"} width={37} height={37} />
              </Grid>
            </Paper>
          );
        } else {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item></Grid>
              <Grid item style={{ textAlign: "center", marginTop: "6px" }}>
                {day.getDate()}
              </Grid>
            </Paper>
          );
        }
      } else {
        dateTile = (
          <Paper className={classes.notInThisMonthDayPaper}>
            <Grid item></Grid>
            <Grid
              item
              style={{
                color: "lightGrey",
                textAlign: "center",
                marginTop: "5px",
              }}
            >
              {day.getDate()}
            </Grid>
          </Paper>
        );
      }
    } else {
      if (isInCurrentMonth.outsideCurrentMonth == false) {
        if (isHappy) {
          dateTile = (
            <div
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </div>
          );
        } else if (isSad) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isStressed) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isSurprised) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isFearful) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isDisgusted) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isNeutral) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else if (isAngry) {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid
                item
                style={{
                  textAlign:"center",
                  marginTop: "5px",
                  color: "#F85975",
                }}
              >
                {day.getDate()}
              </Grid>
            </Paper>
          );
        } else {
          dateTile = (
            <Paper
              className={isToday ? classes.todayPaper : classes.normalDayPaper}
              onClick={() => {
                handleChange(day);
              }}
            >
              <Grid item></Grid>
              <Grid item style={{ textAlign:"center", marginTop: "5px" }}>
                {day.getDate()}
              </Grid>
            </Paper>
          );
        }
      } else {
        dateTile = (
          <Paper className={classes.notInThisMonthDayPaper}>
            <Grid item></Grid>
            <Grid
              item
              style={{
                color: "lightGrey",
                textAlign:"center",
                marginTop: "5px",
              }}
            >
              {day.getDate()}
            </Grid>
          </Paper>
        );
      }
    }

    return dateTile;
  }

  const handleEmoji = (e) => {
    if (!e.target.checked) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Bg />
        <Header />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Grid container justify="center" style={{ marginTop: 160 }}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              renderDay={(day, selectedDate, isInCurrentMonth) =>
                getDayElement(day, selectedDate, isInCurrentMonth)
              }
              disableToolbar={true}
              minDate={minDate}
              maxDate={maxDate}
              value={selectedDate}
              onChange={(newDate) => console.log(newDate)}
              onMonthChange={onPickerViewChange}
              views={["day"]}
              variant="static"
              disableFuture={true}
              renderInput={(params) => (
                <TextField
                  sx={{ fontFamily: "Noto Sans,Kanit,sans-serif" }}
                  fullWidth
                  {...params}
                />
              )}
            />
          </Grid>
        </LocalizationProvider>
        <Grid container justify="center">
          <FormControlLabel
            style={{
              marginLeft: 235,
              marginTop:5,
              color: "#95C3BB",
              fontFamily: "Noto Sans,Kanit,sans-serif",
            }}
            control={<Switch defaultChecked />}
            label="Emoji"
            onChange={(e) => handleEmoji(e)}
          />
        </Grid>
      </ThemeProvider>
      <BottomNavigationBar />
    </div>
  );
}
