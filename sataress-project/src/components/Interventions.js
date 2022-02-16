import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
import Head from "./Head";
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
font-family: Roboto;
font-style: normal;
font-weight: normal;
line-height: 41px;
color: #000000;
${(props) => props.theme.breakpoints.only("xs")} {
  font-size: 32px;
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
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`);

const Progressive = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.50));
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
      <Head />
      <Grid container justify="center">
        <Title style={{ marginTop: 135 }}>Interventions</Title>
          <Boxbreathing style={{ marginTop: 205 }}>
            <Link to="/Boxbreathing">
              <img src="/image/BoxBreathing.png" width="311px" height="228px" />
            </Link>
          </Boxbreathing>
          <Progressive style={{ marginTop: 460 }}>
            <Link to="/Progressive">
              <img src="/image/Progressive.png" width="311px" height="228px" />
            </Link>
          </Progressive>
      </Grid>
      <BottomNavigationBar />
    </div>
  );
};
export default Interventions;


