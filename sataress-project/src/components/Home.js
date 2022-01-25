import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addUser } from "../services/users";
import { getAuth, signOut } from "firebase/auth";
import { logOut } from "../services/firebase";
// import { getUser } from "../services/users";
import { createTheme } from "@mui/material/styles";

import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Paper from "@mui/material/Paper";

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
  left: 211px;
  top: 60px;
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
  height: 12px;
  left: 244px;
  top: 105px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
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
  width: 84px;
  height: 25px;
  left: 81px;
  top: 411px;
`);

const Home = ({ user }) => {
  // add user to firestore
  addUser({ user });
  // getUser();

  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div>
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
        <Name>
          Hi,{user.displayName} <button onClick={logOut}>Sign Out</button>
        </Name>

        <Fire>
          <img src="/image/fire.png" width="23px"></img>
        </Fire>
        <Streak>Current Streak</Streak>
        <Bg>
          {/* Calendar card */}
          <Calendar>
            <Link to="/Calendar">
              <img src="/image/calendar.png" width="307px" height="182px" />
            </Link>
          </Calendar>
          {/* Gratitude journal button */}
          <Gratitude>
            <Link to="/Gratitude">
              <img src="/image/gratitude.png" width="243px" height="31px" />
            </Link>
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
        </Bg>
      </div>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction label="Recents" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
            <BottomNavigationAction
              component={Link}
              to="/Moodtrack"
              label="Moodtracker"
              icon={<FavoriteIcon />}
            />
            <BottomNavigationAction label="Archive" icon={<FavoriteIcon />} />
            <BottomNavigationAction label="Archive" icon={<FavoriteIcon />} />
          </BottomNavigation>
        </Paper>
      </Box>
    </div>
  );
};

export default Home;
