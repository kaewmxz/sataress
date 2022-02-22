import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import { AuthContext } from "../Auth";


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

// let calendar = document.querySelector('.calendar')

// const month_names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

// const isLeapYear = (year) => {
//     return (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) || (year % 100 === 0 && year % 400 ===0)
// }

// const getFebDays = (year) => {
//     return isLeapYear(year) ? 29 : 28
// }

// const generateCalendar = (month, year) => {

//     let calendar_days = calendar.querySelector('.calendar-days')
//     let calendar_header_year = calendar.querySelector('#year')

//     let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//     calendar_days.innerHTML = ''

//     let currDate = new Date()
//     if (!month) month = currDate.getMonth()
//     if (!year) year = currDate.getFullYear()

//     let curr_month = `${month_names[month]}`
//     month_picker.innerHTML = curr_month
//     calendar_header_year.innerHTML = year

//     // get first day of month
    
//     let first_day = new Date(year, month, 1)

//     for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
//         let day = document.createElement('div')
//         if (i >= first_day.getDay()) {
//             day.classList.add('calendar-day-hover')
//             day.innerHTML = i - first_day.getDay() + 1
//             day.innerHTML += `<span></span>
//                             <span></span>
//                             <span></span>
//                             <span></span>`
//             if (i - first_day.getDay() + 1 === currDate.getDate() && year === currDate.getFullYear() && month === currDate.getMonth()) {
//                 day.classList.add('curr-date')
//             }
//         }
//         calendar_days.appendChild(day)
//     }
// }

// let month_list = calendar.querySelector('.month-list')

// month_names.forEach((e, index) => {
//     let month = document.createElement('div')
//     month.innerHTML = `<div data-month="${index}">${e}</div>`
//     month.querySelector('div').onclick = () => {
//         month_list.classList.remove('show')
//         curr_month.value = index
//         generateCalendar(index, curr_year.value)
//     }
//     month_list.appendChild(month)
// })

// let month_picker = calendar.querySelector('#month-picker')

// month_picker.onclick = () => {
//     month_list.classList.add('show')
// }

// let currDate = new Date()

// let curr_month = {value: currDate.getMonth()}
// let curr_year = {value: currDate.getFullYear()}

// generateCalendar(curr_month.value, curr_year.value)

// document.querySelector('#prev-year').onclick = () => {
//     --curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

// document.querySelector('#next-year').onclick = () => {
//     ++curr_year.value
//     generateCalendar(curr_month.value, curr_year.value)
// }

// let dark_mode_toggle = document.querySelector('.dark-mode-switch')

// dark_mode_toggle.onclick = () => {
//     document.querySelector('body').classList.toggle('light')
//     document.querySelector('body').classList.toggle('dark')
// }

const Calendar = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    )
  }
  return (
    <div>
      <Bg />
      <Header />
{/* //       <div class="calendar">
//         <div class="calendar-header">
//             <span class="month-picker" id="month-picker">February</span>
//             <div class="year-picker">
//                 <span class="year-change" id="prev-year">
                   
//                 </span>
//                 <span id="year">2021</span>
//                 <span class="year-change" id="next-year">
                   
//                 </span>
//             </div>
//         </div>
//         <div class="calendar-body">
//             <div class="calendar-week-day">
//                 <div>Sun</div>
//                 <div>Mon</div>
//                 <div>Tue</div>
//                 <div>Wed</div>
//                 <div>Thu</div>
//                 <div>Fri</div>
//                 <div>Sat</div>
//             </div>
//             <div class="calendar-days"></div>
//         </div>
//         <div class="calendar-footer">
//             <div class="toggle">
//                 <span>Dark Mode</span>
//                 <div class="dark-mode-switch">
//                     <div class="dark-mode-switch-ident"></div>
//                 </div>
//             </div>
//         </div>
//         <div class="month-list"></div>
//     </div>*/}
      <BottomNavigationBar/>
    </div> 
  );
};
export default Calendar;
