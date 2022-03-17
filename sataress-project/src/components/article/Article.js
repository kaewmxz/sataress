import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Header from "../Head";
import { AuthContext } from "../Auth";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


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

const Article = () => {
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
      <Grid container justify="center" direction = "row">
      <Card sx={{ width: 345, mt:17, mx:0, p:0}}>
      <Link to ="/ArticleBlog-1">
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily="Roboto Slab, serif, Noto Sans Thai">
          Yoga
        </Typography>
        </Link>
    </Card>
    <Card sx={{ width: 345, mt:2, mx:0, p:0}}>
    <Link to ="/ArticleBlog-2">
      <CardMedia
        component="img"
        height="140"
        image="/static/images/cards/contemplative-reptile.jpg"
        alt="green iguana"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily="Roboto Slab, serif, Noto Sans Thai">
          Yoga2
        </Typography>
    </Link>
    </Card>
    <Card sx={{ width: 345, mt:2, mx:0, p:0, mb:11 }}>
    <Link to ="/ArticleBlog-3">
      <CardMedia
        component="img"
        height="140"
        image="/image/Boxb.png"
        alt="green iguana"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily="Roboto Slab, serif, Noto Sans Thai">
          Yoga3
        </Typography>
        </Link>
    </Card>
    </Grid>
      <BottomNavigationBar/>
    </div>
  );
};
export default Article;
