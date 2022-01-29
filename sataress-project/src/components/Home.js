import React, { useState, useEffect } from "react";
import PopUp from "./Popup";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { createTheme } from "@mui/material/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { addUser, getUsers } from "../services/users";
import { logOut } from "../services/firebase";

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

const BottomNavigationBar = withTheme(styled.div`
  position: fixed;
  width: 381px;
  height: 74px;
  left: -3px;
  top: 1163px;
  background: #ffe9e9;
  box-shadow: inset 0px 4px 4px rgba(251, 24, 24, 0.36);
  border-radius: 23px;
`);

const Home =  ({ user }) => {
  // add user to firestore
  addUser({user});
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  
  useEffect(() => {
    const getFirstname = async () => {
      const [p,b] = await getUsers({user});
      setName(p)
      setImage(b)
    }
    getFirstname()
  }, [])

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
      <div>
        <Head>
          <img src="/image/head.png" width="300px"></img>
          <Profile>
            <Link to="/Calendar">
              <Avatar
                alt=""
                src= {image}
                sx={{ width: 67, height: 67 }}
              >
              </Avatar>
            </Link>
          </Profile>
        </Head>
        <Name id = "name">
          Hi,{name}
          <button onClick={logOut}>Sign Out</button>
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
