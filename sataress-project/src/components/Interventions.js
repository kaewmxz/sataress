import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid , Box} from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
import Header from "./Head";
import { AuthContext } from "./Auth";


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

const Title = withTheme(styled.div`
position: absolute;
font-family: Noto Sans,Kanit,sans-serif;
line-height: 41px;
color: #000000;
${(props) => props.theme.breakpoints.only("xs")} {
  font-size: 26px;
}
${(props) => props.theme.breakpoints.up("sm")} {
  font-size: 32px;
}
${(props) => props.theme.breakpoints.up("md")} {
  font-size: 35px;
}
${(props) => props.theme.breakpoints.up("lg")} {
  font-size: 38px;
}
${(props) => props.theme.breakpoints.up("xl")} {
  font-size: 38px;
}
`);

const Boxbreathing = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 142px;
filter: drop-shadow(0px 4px 4px rgba(189, 0, 255, 0.25));
${(props) => props.theme.breakpoints.only("xs")} {
  padding: 0px;
}
`);


const Progressive = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
top: 346px;
filter: drop-shadow(0px 4px 4px rgba(119, 251, 188, 0.75));
${(props) => props.theme.breakpoints.only("xs")} {
  padding: 0px;
}
`);

const Interventions = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    )
  }
  return (
    <div>
      <Bg />
      <Header />
      <Box>
      <Grid container justify="center" direction = "row">
        <Title style={{ marginTop: 135}}>Relaxation</Title>
          <Boxbreathing style={{ marginTop:40}}>
            <Link to="/Boxbreathing">
              <img src="/image/Boxb.avif" width="311px" height="228px" />
            </Link>
          </Boxbreathing>
          <Progressive style={{marginTop:50,paddingBottom:130}}>
            <Link to="/Progressive">
              <img src="/image/Prog.avif" width="311px" height="228px" />
            </Link>
          </Progressive>
      </Grid>
      </Box>
      <BottomNavigationBar/>
    </div>
  );
};
export default Interventions;


