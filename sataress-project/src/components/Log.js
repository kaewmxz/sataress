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
font-size: 35px;
line-height: 41px;
color: #000000;
${(props) => props.theme.breakpoints.only("xs")} {
}
${(props) => props.theme.breakpoints.up("sm")} {
}
${(props) => props.theme.breakpoints.up("md")} {
}
${(props) => props.theme.breakpoints.up("lg")} {
}
${(props) => props.theme.breakpoints.up("xl")} {
}
`);


const Log = () => {
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
      <Title style = {{marginTop:130}}>Gratitude journal</Title>
      </Grid>
      <BottomNavigationBar/>
    </div>
  );
};
export default Log;
