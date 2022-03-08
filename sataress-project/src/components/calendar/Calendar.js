import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Paper, Grid } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import React, { useState, useEffect, useContext } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth";
import "./DatePicker.css";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";
import axios from "axios";

const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#8bc34a" },
    },
    //bg calendar header
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "transparent",
        color: "#69A454",
      },
      //day style
      dayLabel: {
        fontWeight: "bold",
        padding: "2px",
      },
      iconButton: {
        color: "#69A454",
      },
    },
    //bg calendar body
    MuiPickersStaticWrapper: {
      staticWrapperRoot: {
        backgroundColor: "transparent",
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
    setDate(newDate);
    navigate("/CalendarLogs", { state: { date: newDate } });
  };

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
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
    if (isInCurrentMonth) {
      //conditionally return appropriate Element of date tile.
      if (isHappy) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              {/* <WbSunnyIcon style={{ color: "orange" }} /> */}
              <span role="img" aria-label="happy" style={{fontSize: '24px'}}>
                😊
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isSad) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="sad" style={{fontSize: '24px'}}>
                😭
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isStressed) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="sad" style={{fontSize: '24px'}}> 
                😣
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isSurprised) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="surprised" style={{fontSize: '24px'}}>
                😯
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isFearful) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="fearful" style={{fontSize: '24px'}}>
                😰
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isDisgusted) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="disgusted" style={{fontSize: '24px'}}>
                🤢
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isNeutral) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "1.2px", marginTop: "0.5px" }}>
              <span role="img" aria-label="neutral" style={{fontSize: '24px'}}>
                😶
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else if (isAngry) {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item style={{ marginLeft: "6px", marginTop: "6px" }}>
              <span role="img" aria-label="sad" style={{fontSize: '24px'}}>
                😡
              </span>
            </Grid>
            <Grid item>{/* {day.getDate()} */}</Grid>
          </Paper>
        );
      } else {
        dateTile = (
          <Paper
            className={isToday ? classes.todayPaper : classes.normalDayPaper}
          >
            <Grid item></Grid>
            <Grid item style={{ marginLeft: "9px", marginTop: "9px" }}>
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
            style={{ color: "lightGrey", marginLeft: "9px", marginTop: "9px" }}
          >
            {day.getDate()}
          </Grid>
        </Paper>
      );
    }
    return dateTile;
  }
  return (
    <div>
      <Bg />
      <Header />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container justify="center" style={{ marginTop: 145 }}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <ThemeProvider theme={materialTheme}>
              <DatePicker
                disableToolbar={true}
                minDate={minDate}
                maxDate={maxDate}
                value={selectedDate}
                onChange={(newDate) => handleChange(newDate)}
                onMonthChange={onPickerViewChange}
                variant="static"
                // disablePast={true}
                disableFuture={true}
                // using our function
                renderDay={(
                  day,
                  selectedDate,
                  isInCurrentMonth,
                  dayComponent
                ) =>
                  getDayElement(
                    day,
                    selectedDate,
                    isInCurrentMonth,
                    dayComponent
                  )
                }
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>
        </Grid>
      </LocalizationProvider>
      <BottomNavigationBar />
    </div>
  );
}
