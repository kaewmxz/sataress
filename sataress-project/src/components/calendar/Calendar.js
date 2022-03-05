import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container, createTheme } from "@material-ui/core";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import { AuthContext } from "../Auth";
import "./DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import axios from "axios";

const minDate = new Date("2022-01-01T00:00:00.000");
const maxDate = new Date("2022-12-31T00:00:00.000");

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
const styles = makeStyles((theme) => ({
  dayWithDotContainer: {
    position: "relative",
  },
  dayWithDot: {
    position: "absolute",
    height: 0,
    width: 0,
    border: "2px solid",
    borderRadius: 4,
    borderColor: theme.palette.primary.main,
    right: "50%",
    transform: "translateX(1px)",
    top: "80%",
  },
}));

const Calendarcard = () => {
  const { currentUser } = useContext(AuthContext);
  // Another lib
  // const [selectedDay, setSelectedDay] = useState(null);
  const [date, setDate] = React.useState(new Date());
  const [daysWithDot, setDaysWithDot] = useState([]);
  let navigate = useNavigate();
  console.log(date);
  // const classes = styles();

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
    // fromDate: moment(date).clone().startOf("month").format("M/D/YYYY"),
    // toDate: moment(date).clone().endOf("month").format("MM/D/YYYY"),

    console.log(variables);

    try {
      const result = await axios.get("http://localhost:4000/mood-dates", {
        params: { id: currentUser.uid, date: variables },
      });
      setDaysWithDot(
        result.data.message.map((day) => moment(day).format("YYYY/MM/DD"))
      );
      
    } catch (err) {
      console.log(err);
    }
  };

  // const renderDayInPicker = (
  //   date,
  //   dayComponent
  // ) => {
  //   if (daysWithDot.includes(date.format("YYYY/MM/DD"))) {
  //     return (
  //       <div className={classes.dayWithDotContainer}>
  //         {dayComponent}
  //         <div className={classes.dayWithDot} />
  //       </div>
  //     );
  //   }

  //   return dayComponent;
  // };

  const handleChange = (newDate) => {
    setDate(newDate);
    // const dateToPass = [];
    // dateToPass.push(date)
    // setTimeout(() => navigate("/CalendarLogs", { state: { date: date } }), 1000);
    navigate("/CalendarLogs", { state: { date: newDate } });
  };

  console.log(daysWithDot);
  return (
    <div>
      <Bg />
      <Header />
      {/* Another lib */}
      {/* <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
      /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CalendarPicker
              // date={date}
              minDate={minDate}
              maxDate={maxDate}
              onMonthChange={onPickerViewChange}
              onChange={(newDate) => handleChange(newDate)}
              views={["day"]}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <BottomNavigationBar />
    </div>
  );
};
export default Calendarcard;
