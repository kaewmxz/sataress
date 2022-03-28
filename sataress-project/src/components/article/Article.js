import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import { AuthContext } from "../Auth";


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

const Ar1 = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 142px;
  filter: drop-shadow(0px 4px 4px rgba(253, 6, 6, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Ar2 = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 346px;
  filter: drop-shadow(0px 4px 4px rgba(238, 215, 7, 0.37));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Ar3 = withTheme(styled.div`
  position: absolute;
  width: 320.7px;
  height: 182px;
  top: 550px;
  filter: drop-shadow( 0px 4px 4px rgba(0, 117, 255, 0.25));
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const Article = () => {
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }
  return (
    <div>
      <Bg />
      <Header />
      <Box component="span">
        <Grid container justifyContent="center">
          <Ar1>
            <Link to="/ArticleBlog-1">
              <img
                src="/image/arco1.png"
                width="320.7px"
                height="183px"
              />
            </Link>
          </Ar1>
          <Ar2>
            <Link to="/ArticleBlog-2">
              <img
                src="/image/arco2.png"
                width="320.7px"
                height="183px" />
            </Link>
          </Ar2>
          <Ar3 style={{ paddingBottom: 90 }}>
            <Link to="/ArticleBlog-3">
              <img
                src="/image/arco3.png"
                width="320.7px"
                height="183px" />
            </Link>
          </Ar3>
        </Grid>
      </Box>
      <BottomNavigationBar />
    </div>
  );
};
export default Article;
