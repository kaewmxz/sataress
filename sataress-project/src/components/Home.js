import React, { useEffect, useContext } from "react";
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
import { useNavigate } from "react-router-dom";
import PreloadImage from 'react-preload-image'


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
  filter: drop-shadow(0px 4px 4px rgba(255, 184, 0, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Graph = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 346px;
  filter: drop-shadow(0px 4px 4px rgba(1, 240, 255, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const GratitudeJournal = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 550px;
  filter: drop-shadow(0px 4px 4px rgba(97, 255, 94, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Home = () => {
  // get datetime
  const date = new Date();
  const { currentUser } = useContext(AuthContext);
  const auth = getAuth();
  const username = currentUser.displayName;
  const str = username.split(" ", 2);
  let navigate = useNavigate();
  useEffect(() => {
    if (currentUser) {
      const getUser = async () => {
        const result = await axios.get("https://backend-glint.herokuapp.com/user-firstTime", {
          params: { id: currentUser.uid },
        });
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
              };
              axios
                .post("https://backend-glint.herokuapp.com/users", data)
                .catch((err) => console.log(err));
              axios
                .post("https://backend-glint.herokuapp.com/bi-week", data)
                .catch((err) => console.log(err));
            })
            .catch((error) => {
              console.log(error);
            });
        }
        const dassFirstTime = await axios.get(
          "https://backend-glint.herokuapp.com/dass-firstTime",
          {
            params: { id: currentUser.uid },
          }
        );
        if (dassFirstTime.data.message === "") {
          navigate("/DASS21");
        }
      };
      const checkBiweek = async () => {
        const result = await axios.get("https://backend-glint.herokuapp.com/bi-week-check", {
          params: { id: currentUser.uid },
        });
        try {
          const date1 = new Date(result.data.message[0].date);
          const date2 = new Date();
          const diffTime = Math.abs(date2 - date1);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
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
            <Grid container justifyContent="center">
              <Calendar>
                <Link to="/Calendar">
                  <PreloadImage
                    src="/image/calendar.avif"
                    width="320.7px"
                    height="183px"
                    lazy
                  />
                </Link>
              </Calendar>
              {/* {Graph card} */}
              <Graph>
                <Link to="/Graph">
                <PreloadImage
                    src="/image/graph.avif"
                    width="320.7px" 
                    height="183px"
                    lazy
                  />
                </Link>
              </Graph>
              {/* {Article card} */}
              <GratitudeJournal style={{ paddingBottom: 90 }}>
                <PopupGratitude/>
              </GratitudeJournal>
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
