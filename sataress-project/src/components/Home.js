import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";


import IconButton from '@mui/material/IconButton';
import LogoutIcon from '@mui/icons-material/Logout';
import { logOut } from "../services/firebase";

import LabelBottomNavigation from './Navigation';
import PopupGratitude from "./PopupGratitude";
import PopupSignout from "./PopupSignout"

const Bg = withTheme(styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 217px;
  background: linear-gradient(
    180deg,
    rgba(254, 68, 10, 0) 7.81%,
    #ffbdbd 95.83%
  );
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
  left: 200px;
  top: 59px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
`);


const Fire = withTheme(styled.div`
  position: absolute;
  width: 23px;
  height: 30px;
  left: 211px;
  top: 93px;
`);

const Streak = withTheme(styled.div`
position: absolute;
width: 70px;
left: 244px;
top: 105px;
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 10px;
line-height: 12px;
text-align: center;
`);

const Logout = withTheme(styled.div`
position: absolute;
left: 316px;
top: 97px;
`);

const Calendar = withTheme(styled.div`
  position: absolute;
  left: 36px;
  top: -70px;
`);

const Gratitude = withTheme(styled.div`
  position: absolute;
  left: 71px;
  top: 123px;
`);

const Toggle = withTheme(styled.div`
position: absolute;
left: 130px;
top: 180px;
`);

const Home = ({ user }) => {
//   add user to firestore
//   addUser({ user });
//    getUser();

  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = React.useState("web");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
    <Head>
      <img src="/image/head.png" width="300px"></img>
      <Profile>
        <Link to="/Calendar">
          <Avatar
            alt="Oak Natthakrit"
            src="/broken-image.jpg"
            sx={{ width: 67, height: 67 }}
          >
            O
          </Avatar>
        </Link>
      </Profile>
      </Head>
      <Name>Hi, {user.displayName}</Name>
      
      <Fire>
        <img src="/image/fire.png" width="23px"></img>
      </Fire>
      <Streak>Current Streak</Streak>
      <Logout>
          <PopupSignout>
          </PopupSignout>
      </Logout>
      <Bg>
        {/* Calendar card */}
        <Calendar>
          <Link to="/Calendar">
            <img src="/image/calendar.png"
              width="307px"
              height="182px" />
          </Link>
        </Calendar>
        {/* Gratitude journal button */}
        <Gratitude>
              <PopupGratitude></PopupGratitude>
        </Gratitude>
        {/* Monthly or Weekly button */}
        <Toggle>
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton value="weekly">สัปดาห์</ToggleButton>
            <ToggleButton value="monthly">เดือน</ToggleButton>
          </ToggleButtonGroup>
        </Toggle>

        {/* bottom navigation bar*/}
        <LabelBottomNavigation>
        </LabelBottomNavigation>
      </Bg>
    </div>
  );
};

export default Home;
