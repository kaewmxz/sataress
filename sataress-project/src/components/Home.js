import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BarChart, CartesianGrid, XAxis, YAxis, Bar } from "recharts";

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
  position: absolute;
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  top: 217px;
  background: linear-gradient(
    180deg,
    rgba(254, 68, 10, 0) 7.81%,
    #ffbdbd 95.83%
  );
`);

const Head = withTheme(styled.div`
  position: absolute;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 109.5px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 292.5px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 449.5px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 769.5px;
  }
`);

const Profile = withTheme(styled.div`
  position: absolute;
  left: 28px;
  top: 38px;
`);

const Name = withTheme(styled.div`
  position: absolute;
  width: 132px;
  left: 208px;
  top: 50px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  text-align: center;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 115px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 295px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 455px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 775px;
  }
`);

const Fire = withTheme(styled.div`
  position: absolute;
  width: 23px;
  height: 30px;
  left: 220px;
  top: 80px;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 115px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 295px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 455px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 775px;
  }
`);

const Streak = withTheme(styled.div`
  position: absolute;
  width: 70px;
  left: 248px;
  top: 90px;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 115px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 295px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 455px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 775px;
  }
`);


const Logout = withTheme(styled.div`
  position: absolute;
  left: 320px;
  top: 82px;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 115px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 295px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 455px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 775px;
  }
`);

const Calendar = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
left: 47px;
top: -70px;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 99.5px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 279.5px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 439.5px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 759.5px;
  }
`);

const Graph = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
left: 47px;
top: 130px;
background: #FFFFFF;
box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 4px 4px rgba(0, 0, 0, 0.25);
border-radius: 17px;
${(props) => props.theme.breakpoints.down("xs")} {
  margin-left: 0px;
}
${(props) => props.theme.breakpoints.up("sm")} {
  margin-left: 99.5px;
}
${(props) => props.theme.breakpoints.up("md")} {
  margin-left: 279.5px;
}
${(props) => props.theme.breakpoints.up("lg")} {
  margin-left: 439.5px;
}
${(props) => props.theme.breakpoints.up("xl")} {
  margin-left: 759.5px;
}
`);

const Gratitude = withTheme(styled.div`
  position: absolute;
  left: 78px;
  top: 332px;
  ${(props) => props.theme.breakpoints.down("xs")} {
    margin-left: 0px;
  }
  ${(props) => props.theme.breakpoints.up("sm")} {
    margin-left: 105px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    margin-left: 285px;
  }
  ${(props) => props.theme.breakpoints.up("lg")} {
    margin-left: 445px;
  }
  ${(props) => props.theme.breakpoints.up("xl")} {
    margin-left: 765px;
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
  position: relative;
  top: 620px;
`);

const Home = () => {
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
      {currentUser ? (
        <div>
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
          <Bg>
            {/* Calendar card */}
            <Calendar>
              <Link to="/Calendar">
                <img src="/image/calendar.png" width="320.7px" height="182px" />
              </Link>
            </Calendar>
            {/* {Graph card} */}
            <Graph>
              <Link to ="/">
                </Link>
            </Graph>
            {/* Gratitude journal button */}
            <Gratitude>
              <PopupGratitude></PopupGratitude>
            </Gratitude>
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
            <NavigateBar>
              <BottomNavigationBar />
            </NavigateBar>
          </Bg>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
