import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box} from '@material-ui/core';
import BottomNavigationBar from "./BottomNavigationBar ";
import PopupGratitude from "./popup/PopupGratitude";
import { AuthContext } from "./Auth";
import Login from "./Login";
import { getAuth, getRedirectResult } from "firebase/auth";
import axios from "axios";
import "../css/home.css";
import Header from "./Head";

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
  align-items:center;
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
                  <img src="/image/calendar.png" width="320.7px" height="183px" />
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
                  <img src="/image/article.png" width="320.7px" height="183px" />
                </Link>
              </Article>
              {/* Gratitude journal button */}
              <Gratitude style={{ paddingBottom: 100 }}>
                <PopupGratitude/>
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
