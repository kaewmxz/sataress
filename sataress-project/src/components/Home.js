import React, { useState, useEffect, useContext } from "react";
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
import Plot from "react-plotly.js";
import axios from "axios";

import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";

import LabelBottomNavigation from "./Navigation";
import PopupGratitude from "./popup/PopupGratitude";
import PopupSignout from "./popup/PopupSignout";
import { addUser, getUsers } from "../services/users";
import { logOut } from "../services/firebase";
import { AuthContext } from "./Auth";
import Login from "./Login";
import Moodtrack from "./Moodtrack";
import { getAuth, getRedirectResult, GoogleAuthProvider } from "firebase/auth";
import axios from "axios";
import { errorPrefix } from "@firebase/util";

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

// const BottomNavigationBar = withTheme(styled.div`
//   position: fixed;
//   width: 381px;
//   height: 74px;
//   left: -3px;
//   top: 1163px;
//   background: #ffe9e9;
//   box-shadow: inset 0px 4px 4px rgba(251, 24, 24, 0.36);
//   border-radius: 23px;
// `);

const Home =  () => {
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();
  
  // add user to firestore
  //addUser({currentUser});
  const [name,setName] = useState("");
  const [image,setImage] = useState("");
  useEffect(() => {
    const firstname = localStorage.getItem('firstname');
    const photo = localStorage.getItem('photo');
    setName(firstname)
    setImage(photo)
    // const getFirstname = async () => {
    //   const [p,b] = await getUsers({currentUser});
    //   setName(p)
    //   setImage(b)
      
    // }
    getRedirectResult(auth)
    .then((result) => {
      const user = result.user;
      const str = user.displayName;
      const res = str.split(" ", 2);
      const data = {
        id: user.uid,
        email: user.email,
        firstname: res[0],
        lastname: res[1],
        photo: user.photoURL
      }
      localStorage.setItem("firstname",res[0]);
      localStorage.setItem("photo",user.photoURL);
      axios.post("http://localhost:4000/users", data).catch((err) => console.log(err))
      window.location.reload();
    }).catch((error) => {
      console.log(error)
    });
    // getFirstname()
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

  // function getmoodBar() {
  //   const id = "5g377b9WoOMBNr6ryq76L5YWImW2";
  //   return axios
  //     .get("http://localhost:4000/mood/", { params: { id: id } })
  //     .then((response) => response.data.message)
  //     .catch((err) => console.error(err));
  // }
  // const moodBar = getmoodBar();
  // getmoodBar().then(function (result) {
  //   console.log(result); // "initResolve"
  //   moodBar = result;
  // });

  const getmoodBar = async () => {
    const id = "5g377b9WoOMBNr6ryq76L5YWImW2";
    try {
      const response = await axios.get("http://localhost:4000/mood/", {
        params: { id: id },
      });
      return response.data.message;
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const moodBar = async () => {
    return await getmoodBar();
  };

  // console.log(await getmoodBar());

  // try {
  //   (async () => {
  //     connection = await getmoodBar();
  //   })();
  // } catch (err) {
  //   console.log(err);
  // }

  return (
    <div>
      {currentUser ? (
        <div>
            <Head>
      <img src="/image/head.png" width="300px"></img>
      <Profile>
        <Link to="/Moodtrack">
          <Avatar
            alt=""
            src= {image}
            sx={{ width: 67, height: 67 }}
          >
          </Avatar>
        </Link>
      </Profile>
      </Head>
      <Name>Hi, {name} {moodBar}</Name>
      <Fire>
        <img src="/image/fire.png" width="23px"></img>
      </Fire>
      <Streak>Current Streak</Streak>
      <Logout>
        <PopupSignout></PopupSignout>
      </Logout>
      <Bg>
        {/* Calendar card */}
        <Calendar>
          <Link to="/Calendar">
            <img src="/image/calendar.png" width="307px" height="182px" />
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
        <LabelBottomNavigation></LabelBottomNavigation>
        {/* <Plot
          data={moodBar}
          layout={{ width: 320, height: 240, title: "plot" }}
        /> */}
        
      </Bg>
          </div>
      ) : <Login/>}
    
    </div>
  );
};

export default Home;
