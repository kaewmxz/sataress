import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import { AuthContext } from "../Auth";
import "./DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import CalendarPicker from "@mui/lab/CalendarPicker";


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

const Calendarcard = () => {
  const { currentUser } = useContext(AuthContext);
  // const [selectedDay, setSelectedDay] = useState(null);
  const [date, setDate] = React.useState(new Date());

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }
  return (
    <div>
      <Bg />
      <Header />
      {/* <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
      /> */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <CalendarPicker
              date={date}
              minDate={minDate}
              maxDate={maxDate}
              onChange={(newDate) => setDate(newDate)}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <BottomNavigationBar />
    </div>
  );
};
export default Calendarcard;
