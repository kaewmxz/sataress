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
      <Card sx={{width: 345,mt:18,mx:"auto",boxShadow:"0px 3px 3px #92FC9C;"}}>
      <Link to ="/ArticleBlog-1">
      <CardMedia
        component="img"
        height="140"
        image="../image/ar1.png"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
        ดูแลสุขภาพจิตของคุณด้วย 5 ขั้นตอน
        </Typography>
        </Link>
    </Card>
    <Card sx={{ width: 345,mt:3,mx:"auto",boxShadow:"0px 3px 3px #92FC9C;"}}>
    <Link to ="/ArticleBlog-2">
      <CardMedia
        component="img"
        height="140"
        image="../image/ar2.png"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
        แผนการคลายเครียดง่ายๆ ที่โต๊ะทำงานสามารถทำได้ 4 ขั้นตอน
        </Typography>
    </Link>
    </Card>
    <Card sx={{ width: 345,mt:3,mx:"auto",mb:11,boxShadow:"0px 3px 3px #92FC9C;"}}>
    <Link to ="/ArticleBlog-3">
      <CardMedia
        component="img"
        height="140"
        image="../image/ar3.png"
        alt="green iguana"
      />
        <Typography gutterBottom variant="h5" component="div" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
        แค่ยิ้มและหัวเราะ ก็ทำให้ร่างกายผ่อนคลาย สุขภาพจิตดีขึ้น
        </Typography>
        </Link>
    </Card>
      <BottomNavigationBar/>
    </div>
  );
};
export default Article;
