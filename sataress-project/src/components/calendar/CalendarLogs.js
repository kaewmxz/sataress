import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from "@material-ui/core";
import { AuthContext } from "../Auth";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import axios from "axios";

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

const CalendarLogs = () => {
  const { currentUser } = useContext(AuthContext);
  let location = useLocation();
  console.log(location.state.date);
  const [data, setData] = useState([]);
//   const date1 = new Date(location.state.date);
//   const date2 = new Date();
//   console.log(date1.getDate() == date2.getDate())
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
  console.log(data);
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }
//   console.log(data);
  return (
    <div>
      <Bg />
      <Header />
      <BottomNavigationBar />
    </div>
  );
};
export default CalendarLogs;
