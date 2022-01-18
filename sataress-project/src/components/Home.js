import React, { useState } from "react";
import { auth } from "../services/firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import { withTheme } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Bg = withTheme(styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 217px;
  background: linear-gradient(180deg,
  rgba(254, 68, 10, 0) 7.81%,
  #FFBDBD 95.83%);
`);

const Head = withTheme(styled.div`
position: absolute;
height: 0px;
`);

const Profile = withTheme(styled.div`
position: absolute;
left: 28px;
top: 38px;
`);

const Name = withTheme(styled.div`
position: absolute;
width: 132px;
height: 26px;
left: 211px;
top: 60px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 22px;
line-height: 26px;
text-align: center;
`);

const Home = ({ user }) => {
  var name = user.displayName;
  var uid = user.uid;
  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <Head>
      <img
        src="/image/head.png"
        width="300px">
      </img>
      <Profile>
      <Link to="/Calendar">
        <Avatar
          alt="Oak Natthakrit"
          src="/broken-image.jpg"
          sx={{ width: 67, height: 67 }}>O</Avatar>
          </Link>
      </Profile>
      <Name>
          Hi,{name}
        </Name>
        <img
           src = "/image/fire.png"
           width = "23px"></img>
      <Bg>
          <center>
            {/* Calendar card */}
            <Link to="/Calendar">
              <img src="/image/calendar.png" />
            </Link>
            <br />
            <br />
            {/* Gratitude journal button */}
            <button /*onClick={}*/>Gratitude journal</button>
            <br />
            <br />
            {/* Monthly or Weekly button */}
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton value="weekly">Weekly</ToggleButton>
              <ToggleButton value="monthly">Monthly</ToggleButton>
            </ToggleButtonGroup>
          </center>
      </Bg>
    </Head>
  );
};

export default Home;
