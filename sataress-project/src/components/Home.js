import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import {useNavigate } from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
import PopupGratitude from "./popup/PopupGratitude";
import { AuthContext } from "./Auth";
import Login from "./Login";
import { getAuth, getRedirectResult } from "firebase/auth";
import axios from "axios";
import "../css/home.css";
import Head from "./Head";

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


const Calendar = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 132px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`);

const Graph = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 336px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.50));
`);

const Article = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 545px;
`);

const Gratitude = withTheme(styled.div`
  position: absolute;
  top: 740px;
`);

const GridLayout = withTheme(styled(Grid)`
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding: 0px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    padding: 0px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    padding: 0px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    padding: 0px;
  }
`);

// const Toggle = withTheme(styled.div`
//   position: absolute;
//   left: 138px;
//   top: 180px;
// `);

// const GraphBox = withTheme(styled.div`
//   position: absolute;
//   width: 307px;
//   height: 182px;
//   left: 55px;
//   top: 250px;

//   background: #ffffff;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
//     inset 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 17px;
// `);
// const GraphBox1 = withTheme(styled.div`
//   position: absolute;
//   width: 307px;
//   height: 182px;
//   left: 55px;
//   top: 500px;

//   background: #ffffff;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
//     inset 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 17px;
// `);

// const GraphBox2 = withTheme(styled.div`
//   position: absolute;
//   width: 307px;
//   height: 182px;
//   left: 55px;
//   top: 700px;

//   background: #ffffff;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25),
//     inset 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 17px;
// `);

const NavigateBar = withTheme(styled.div`
  position: fixed;
  bottom: 0;
`);

const Home = () => {
  const navigate = useNavigate();
  // get datetime
  const date = new Date();
  const dateTime = [
    date.getMonth() + 1,
    date.getDate().toString(),
    date.getFullYear().toString(),
  ];
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [moodCount, setmoodCount] = useState([]);
  const [moodIntense, setmoodIntense] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  const username = currentUser.displayName;
  const str = username.split(" ", 2);
  const nickname = str[0];
  useEffect(() => {
    if (currentUser) {
      setName(nickname);
      setImage(currentUser.photoURL);
      getRedirectResult(auth)
        .then((result) => {
          const user = result.user;
          const data = {
            id: user.uid,
            email: user.email,
            firstname: str[0],
            lastname: str[1],
            photo: user.photoURL,
            date: dateTime.join("/"),
          };
          axios
            .post("http://localhost:4000/users", data)
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          //console.log(error)
        });
      const fetchmoodCount = async () => {
        const result = await axios.get("http://localhost:4000/mood/", {
          params: { id: currentUser.uid },
        });

        setmoodCount(result.data.message);
      };
      const fetchmoodIntense = async () => {
        const result = await axios.get("http://localhost:4000/mood-intense/", {
          params: { id: currentUser.uid },
        });

        setmoodIntense(result.data.message);
      };
      const fetchgratitude = async () => {
        const result = await axios.get("http://localhost:4000/gratitude/", {
          params: { id: currentUser.uid },
        });

        setGratitude(result.data.message);
      };
      fetchmoodCount();
      fetchmoodIntense();
      fetchgratitude();
    }
  }, []);

  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = useState("web");

  const [open, setOpen] = useState(false);

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
      {currentUser ? (
        <div>
          <Bg />
          <Head/>
          {/* Calendar card */}
          <Grid container
          justifyContent="center"
          xs = {7}
          sm = {8}
          md = {9}
          lg = {10}
          xl = {12}>
            <Grid item>
              <Calendar>
                <Link to="/Calendar">
                  <img src="/image/calendar.png" width="320.7px" height="183px" />
                </Link>
              </Calendar>
            </Grid>
            {/* {Graph card} */}
            <Grid item>
              <Graph>
                <Link to="/">
                  <img src="/image/graph.png" width="320.7px" height="183px" />
                </Link>
              </Graph>
            </Grid>
            {/* {Article card} */}
            <Grid item>
              <Article>
                <Link to="/">
                </Link>
              </Article>
            </Grid>
            {/* Gratitude journal button */}
            <Grid item style={{marginLeft:25.56}}>
              <Gratitude>
                <PopupGratitude></PopupGratitude>
              </Gratitude>
            </Grid>
          </Grid>
          {/* Monthly or Weekly button */}
          {/* <Toggle>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton value="weekly">สัปดาห์</ToggleButton>
                <ToggleButton value="monthly">เดือน</ToggleButton>
              </ToggleButtonGroup>
            </Toggle> */}
          {/* <GraphBox>
              <BarChart width={307} height={182} data={moodCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mood" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </GraphBox>
            <GraphBox1>
              <BarChart width={307} height={182} data={moodIntense}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mood" />
                <YAxis />
                <Bar dataKey="average" fill="#8884d8" />
              </BarChart>
            </GraphBox1>
            <GraphBox2> */}
          {/* <SimpleWordcloud />
            </GraphBox2> */}
          {/* bottom navigation bar*/}
          <BottomNavigationBar />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
