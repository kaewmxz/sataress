import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import BottomNavigationBar from "./BottomNavigationBar ";
import PopupGratitude from "./popup/PopupGratitude";
import { AuthContext } from "./Auth";
import Login from "./Login";
import { getAuth, getRedirectResult } from "firebase/auth";
import axios from "axios";
import "../css/home.css";
import Header from "./Head";
// import Dass from "./Dass";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

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
  align-items: center;
`);

const Calendar = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 142px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Graph = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 346px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Article = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 550px;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Gratitude = withTheme(styled.div`
  position: absolute;
  top: 754px;
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
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
  const [firstTime, setFirstTime] = useState(true);
  const username = currentUser.displayName;
  const str = username.split(" ", 2);
  let navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      const getUser = async () => {
        const result = await axios.get("http://localhost:4000/user-firstTime", {
          params: { id: currentUser.uid },
        });
        console.log(result);
        try {
          setFirstTime(result.data.message[0].firstTime);
        } catch {
          console.log("Empty data");
        }
        if (result.data.message === "") {
          console.log("check");
          getRedirectResult(auth)
            .then((result) => {
              const user = result.user;
              const data = {
                id: user.uid,
                email: user.email,
                firstname: str[0],
                lastname: str[1],
                photo: user.photoURL,
                date: date,
                firstTime: false,
              };
              axios
                .post("http://localhost:4000/users", data)
                .catch((err) => console.log(err));
              axios
                .post("http://localhost:4000/bi-week", data)
                .catch((err) => console.log(err));

              navigate("/DASS21");
            })
            .catch((error) => {
              //console.log(error)
            });
        }
      };
      const checkBiweek = async () => {
        const result = await axios.get("http://localhost:4000/bi-week-check", {
          params: { id: currentUser.uid },
        });
        // console.log(result);
        try {
          const date1 = new Date(result.data.message[0].date);
          const date2 = new Date();
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          console.log(diffDays)
          if (diffDays > 13) {
            //navigate to DASS-21
            navigate("/DASS21");
          }
        } catch (e) {
          console.log(e);
        }
      };
      getUser();
      checkBiweek();
    }

  }, []);

  return (
    <div>
      {currentUser ? (
        <div>
          <Bg />
          <Header />
          {/* Calendar card */}

          <Box component="span">
            <Grid container justify="center">
              <Calendar>
                <Link to="/Calendar">
                  <img
                    src="/image/calendar.png"
                    width="320.7px"
                    height="183px"
                  />
                </Link>
              </Calendar>
              {/* {Graph card} */}
              <Graph>
                <Link to="/Graph">
                  <img src="/image/graph.png" width="320.7px" height="183px" />
                </Link>
              </Graph>
              {/* {Article card} */}
              <Article>
                <Link to="/Article">
                  <img
                    src="/image/article.png"
                    width="320.7px"
                    height="183px"
                  />
                </Link>
              </Article>
              {/* Gratitude journal button */}
              <Gratitude style={{ paddingBottom: 90 }}>
                <PopupGratitude />
              </Gratitude>
            </Grid>
          </Box>
          <BottomNavigationBar />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Home;
