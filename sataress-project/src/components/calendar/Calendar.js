// import React, { useState, useEffect, useContext } from "react";
// import { Link } from "react-router-dom";
// import styled from "styled-components";
// import { withTheme } from "@material-ui/core/styles";
// import { Grid, Container, createTheme } from "@material-ui/core";
// import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
// import BottomNavigationBar from "../BottomNavigationBar ";
// import Header from "../Head";
// import { AuthContext } from "../Auth";
// import "./DatePicker.css";
// import { Calendar } from "react-modern-calendar-datepicker";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import CalendarPicker from "@mui/lab/CalendarPicker";
// import { makeStyles } from "@mui/styles";
// import moment from "moment";
// import axios from "axios";
// import { ThemeProvider } from "styled-components";

// const minDate = new Date("2022-01-01T00:00:00.000");
// const maxDate = new Date("2022-12-31T00:00:00.000");

// const Bg = withTheme(styled.div`
//   position: fixed;
//   width: 100%;
//   height: 100%;
//   top: 217px;
//   z-index: -1;
//   background: linear-gradient(
//     180deg,
//     rgba(254, 68, 10, 0) 17.83%,
//     #ffbdbd 95.83%
//   );
// `);
// const useStyles = makeStyles({
//   dayWithDotContainer: {
//     position: "relative",
//   },
//   dayWithDot: {
//     position: "absolute",
//     height: 0,
//     width: 0,
//     border: "2px solid",
//     borderRadius: 4,
//     right: "50%",
//     transform: "translateX(1px)",
//     top: "80%",
//   },
// });

// export default function Calendarcard() {
//   const classes = useStyles();
//   const { currentUser } = useContext(AuthContext);
//   // Another lib
//   // const [selectedDay, setSelectedDay] = useState(null);
//   const [date, setDate] = React.useState(new Date());
//   const [daysWithDot, setDaysWithDot] = useState([]);
//   let navigate = useNavigate();
//   console.log(date);
//   // const classes = styles();

//   useEffect(() => {
//     if (currentUser) {
//       onPickerViewChange();

//     }
//   }, []);

//   if (!currentUser) {
//     return (
//       <Routes>
//         <Route path="/" element={<Navigate replace to="/" />}></Route>
//       </Routes>
//     );
//   }

//   const onPickerViewChange = async (date) => {
//     const variables = [
//       moment(date).clone().startOf("month").format("M/D/YYYY"),
//       moment(date).clone().endOf("month").format("MM/D/YYYY"),
//     ];
//     // fromDate: moment(date).clone().startOf("month").format("M/D/YYYY"),
//     // toDate: moment(date).clone().endOf("month").format("MM/D/YYYY"),

//     console.log(variables);

//     try {
//       const result = await axios.get("http://localhost:4000/mood-dates", {
//         params: { id: currentUser.uid, date: variables },
//       });
//       setDaysWithDot(
//         result.data.message.map((day) => moment(day).format("YYYY/MM/DD"))
//       );

//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const renderDayInPicker = (
//     date,
//     dayComponent
//   ) => {
//     if (daysWithDot.includes(date.format("YYYY/MM/DD"))) {
//       return (
//         <div className={classes.dayWithDotContainer}>
//           {dayComponent}
//           <div className={classes.dayWithDot} />
//         </div>
//       );
//     }

//     return dayComponent;
//   };

//   const handleChange = (newDate) => {
//     setDate(newDate);
//     // const dateToPass = [];
//     // dateToPass.push(date)
//     // setTimeout(() => navigate("/CalendarLogs", { state: { date: date } }), 1000);
//     navigate("/CalendarLogs", { state: { date: newDate } });
//   };

//   console.log(daysWithDot);
//   return (
//     <div>
//       <Bg />
//       <Header />
//         <LocalizationProvider dateAdapter={AdapterDateFns}>
//           <Grid container justify="center" style={{ marginTop: 130 }}>
//             <Grid item xs={12} md={6}>
//               <CalendarPicker
//                 // date={date}
//                 minDate={minDate}
//                 maxDate={maxDate}
//                 // onMonthChange={onPickerViewChange}
//                 onMonthChange={onPickerViewChange}
//               onChange={(newDate) => handleChange(newDate)}
//               views={["day"]}
//               />
//             </Grid>
//           </Grid>
//         </LocalizationProvider>
//       <BottomNavigationBar />
//     </div>
//   );
// };

import React, { useState } from 'react';
import DateFnsUtils from "@date-io/date-fns";
import { DatePicker, MuiPickersUtilsProvider, } from '@material-ui/pickers';
import { Paper, Grid } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";


const materialTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: { backgroundColor: "#8bc34a", },
    },
    //สีชื่อเดือน
    MuiPickersCalendarHeader: {
      switchHeader: {
        backgroundColor: "white",
        color: "#1b5e20",
      },
    },
    MuiPickersDay: {
      day: {
        color: 'black',

      },
      daySelected: {
        backgroundColor: '#33abb6',
      },
      dayDisabled: {
        color: '#ccc',
      },
      current: {
        color: 'red',
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: '#33abb6',
        backgroundColor: 'black',
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

export const styles = makeStyles(() => ({ //define CSS for different date types
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
    backgroundColor: "lightGreen",
    margin: "3px",
    boxShadow: "none",
    borderRadius: 20,
    padding: "1px",
    cursor: "pointer",
    color: " white",
  },
}));
export default function CustomCalendar() {
  const [selectedDate, handleDateChange] = useState(new Date());
  const classes = styles(); // import those CSS
  const today = new Date(); // just Date object of today
  const sunnyDays = [1, 6, 10, 24, 15] // array of sunny days 1st,6th etc

  function getDayElement(day, selectedDate, isInCurrentMonth, dayComponent) {
    //generate boolean 
    const isSunny = sunnyDays.includes(day.getDate());
    const isSelected = day.getDate() === selectedDate.getDate();
    const isToday = day.getDate() === today.getDate() && day.getMonth() === today.getMonth();

    let dateTile
    if (isInCurrentMonth) { //conditionally return appropriate Element of date tile.
      if (isSunny) {
        dateTile = (
          <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
            <Grid item></Grid>
            <Grid item style={{ marginLeft: "9px", marginTop: "9px" }}>
              {day.getDate()}
            </Grid>
          </Paper>)
      } else {
        dateTile = (
          <Paper className={isSelected ? classes.selectedDayPaper : isToday ? classes.todayPaper : classes.normalDayPaper}>
            <Grid item></Grid>
            <Grid item style={{ marginLeft: "9px", marginTop: "9px" }}>
              {day.getDate()}
            </Grid>
          </Paper>)
      }

    } else {
      dateTile = (<Paper className={classes.notInThisMonthDayPaper}>
        <Grid item></Grid>
        <Grid item style={{ color: "lightGrey", marginLeft: "9px", marginTop: "9px" }}>
          {day.getDate()}
        </Grid>
      </Paper>)
    }
    return dateTile
  }
  return (
    <div>
      <Bg />
      <Header />
      <Grid container justify="center" style={{ marginTop: 140 }}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={materialTheme}>
            <DatePicker
              disableToolbar={true}
              value={selectedDate}
              onChange={handleDateChange}
              variant="static"
              // using our function 
              renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => getDayElement(day, selectedDate, isInCurrentMonth, dayComponent)}
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Grid>
      <BottomNavigationBar />
    </div>
  );
}
