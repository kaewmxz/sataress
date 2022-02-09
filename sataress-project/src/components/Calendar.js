import React, {useContext} from "react";
import { Routes, Route, Navigate} from 'react-router-dom';
import { AuthContext } from "./Auth";

// getCurrentDatetime.month;

// calendar == month;

// getCalendarInfo;


const Calendar = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path ="/" element={<Navigate replace to ="/"/>}></Route>
      </Routes>
    )
  }
  return (
    <div className="Calendar">
      <center>Hi, this is calendar page.</center>
    </div>
  );
};
export default Calendar;


