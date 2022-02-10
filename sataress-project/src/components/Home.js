import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";
import { Grid, Container } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
// import IconButton from "@mui/material/IconButton";
// import LogoutIcon from "@mui/icons-material/Logout";
import PopupGratitude from "./popup/PopupGratitude";
import PopupSignout from "./popup/PopupSignout";
import { AuthContext } from "./Auth";
import Login from "./Login";
import { getAuth, getRedirectResult } from "firebase/auth";
import axios from "axios";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "../css/home.css";

const Bg = withTheme(styled.div`
position: fixed;
width: 100%;
height: 100%;
top: 217px;
z-index:-1;
background: linear-gradient(180deg, rgba(254, 68, 10, 0) 17.83%, #FFBDBD 95.83%);
`);

const Head = withTheme(styled.div`
  position: absolute;
  left: 0px;
  top: 0px;

`);

const Profile = withTheme(styled.div`
  position: absolute;
  left: 33px;
  top: 36px;
`);

const Name = withTheme(styled.div`
  position: absolute;
  width: 200px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  top: 47px;
  ${(props) => props.theme.breakpoints.up("xs")} {
    font-size: 20px;
    margin-left:320px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size: 24px;
    right: 50px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 28px;
    right: 70px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 30px;
    right: 100px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    font-size: 32px;
    right: 120px;
  }
`);

const Fire = withTheme(styled.div`
  position: absolute;
  width: 23px;
  height: 30px;
  top: 75px;
${(props) => props.theme.breakpoints.up("xs")} {
  margin-left:310px;
  font-size: 20px;
}
  ${(props) => props.theme.breakpoints.up("sm")} {
    right: 230px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    right: 245px;
    margin-top:5px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    right: 285px;
    margin-top:10px;

  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    right: 310px;
    margin-top:20px;
  }
`);

const Streak = withTheme(styled.div`
  position: absolute;
  top: 85px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  line-height: 12px;
  text-align: center;
  ${(props) => props.theme.breakpoints.up("xs")} {
    margin-left: 340px;
    font-size: 10px;
    width: 68.94px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    font-size:12px;
    width: 90px;
    right: 140px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    font-size: 16px;
    margin-top:5px;
    width: 135px;
    right: 120px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    font-size: 20px;
    margin-top:10px;
    width: 137px;
    right: 145px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    font-size: 24px;
    margin-top:20px;
    width: 188px;
    right: 133px;
  }
`);


const Logout = withTheme(styled.div`
  position: absolute;
  top: 77px;
  ${(props) => props.theme.breakpoints.up("xs")} {
    margin-left: 410px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    right: 110px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-top:5px;
    right: 105px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-top:10px;
    right: 120px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-top:20px;
    right: 120px;
  }
`);

const Calendar = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 132px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 17px;
`);

const Graph = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 336px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 17px;
`);

const Article = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 545px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 17px;
`);

const Gratitude = withTheme(styled.div`
  position: absolute;
  top: 740px;
`);

const GridLayout = withTheme(styled(Grid)`
${(props) => props.theme.breakpoints.only("xs")} {
  padding:0px;
}
  ${(props) => props.theme.breakpoints.up("sm")} {
    padding:0px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    padding:0px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    padding:0px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    padding:0px;
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
  bottom:0;
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

  const SimpleWordcloud = () => {
    return <ReactWordcloud words={gratitude} />;
  };

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
          <Head>
            <img src="/image/head.png" width="300px"></img>
            <Profile>
              <Link to="/Moodtrack">
                <Avatar
                  alt=""
                  src={image}
                  sx={{ width: 67, height: 67 }}
                ></Avatar>
              </Link>
            </Profile>
          </Head>
            <Name>Hi, {name}</Name>
            <Fire>
              <img src="/image/fire.png" width="23px"></img>
            </Fire>
            <Streak>Current Streak</Streak>
            <Logout>
              <PopupSignout></PopupSignout>
            </Logout>

          {/* Calendar card */}
            <Grid container justifyContent="center" alignItems="center">
              <Calendar>
                  <Link to="/Calendar">
                    <img src="/image/calendar.png" width="320.7px" height="182px" />
                  </Link>
              </Calendar>
            {/* {Graph card} */}
              <Graph>
                <Link to="/">
                </Link>
              </Graph>
              {/* {Article card} */}
              <Article>
                <Link to="/">
                </Link>
              </Article>
              {/* Gratitude journal button */}
              <Gratitude>
                <PopupGratitude></PopupGratitude>
              </Gratitude>
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
  )
}
    </div >

  );
};

export default Home;
