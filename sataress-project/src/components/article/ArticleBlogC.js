import React, { useState, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Routes, Route, Navigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


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

const Image = withTheme(styled.div`
position: absolute;
`);

const theme = createTheme({
    components: {
      // Name of the component
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily:'Noto Sans,Kanit,sans-serif'
          },
        },
      }
    }
  });

const ArticleBlogC = () => {
    let navigate = useNavigate();
    const handleClick = () => {
        console.log("error")
        navigate("/Article");
    };
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
             <ThemeProvider theme={theme}>
            <Bg />
            <Head />
            <Grid container justify="center">
                <ArrowBackIosNewIcon
                    onClick={() => handleClick()}
                    sx={{ fontSize: 15, mt: 15, ml: -20, position: "absolute", cursor: "pointer" }} color="gray" />
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/arco3.png" width="320.7px" height="182px" />
                </Image>
                <br/>
                <Card sx={{ maxWidth: 450, marginTop: 45, marginBottom: 5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        ความเชื่อมโยงระหว่างสุขภาพจิตและสภาพร่างกาย
                        </Typography>
                        <Typography variant="h7" color="text.secondary">
                        ความเชื่อมโยงกันหลายอย่างระหว่างสุขภาพจิตและสภาพร่างกายมีส่งผลกระทบอย่างมากต่อคุณภาพของชีวิตผู้คนและมีผลกระทบต่อสังคมอย่างมากล้น
                        <br/>
                        องค์การอนามัยโลก (WHO) ให้คำจำกัดความว่า "การมีสุขภาพสมบูรณ์ที่แข็งแรง ต้องรวมทั้งทางร่างกาย จิตใจ และสังคม มิใช่เพียงแค่การปราศจากโรคภัยไข้เจ็บหรือทุพพลภาพเท่านั้น"
                        <br/>
                        ไม่มีที่ใดให้ความสำคัญระหว่างสุขภาพจิตและสุขภาพร่างกายมากไปกว่าด้านใดด้านหนึ่ง ทั้งสองมีความสัมพันธ์ร่วมกัน:
                        <br/>
                        ถ้าสุขภาพจิตไม่ปกติเป็นปัจจัยเสี่ยงต่อสภาพร่างกายผิดปกติ
                        <br/>
                        ผู้ที่มีภาวะสุขภาพจิตไม่ปกติ จะมีความเสี่ยงสูงที่จะประสบกับภาวะร่างกายผิดปกติเรื้อรัง
                        <br/>
                        ผู้ที่มีสภาพร่างกายผิดปกติเรื้อรัง จะมีความเสี่ยงที่จะมีสุขภาพจิตผิดปกติ
                        <br/>
                        ปัจจัยสำคัญในการป้องกันปัญหาเหล่านี้คือ การออกกำลังกาย รับประทานอาหารที่มีคุณค่าทางโภชนาการครบ 5 หมู่ และการพักผ่อนที่เพียงพอ 
                        ปัจจัยเหล่านี้ช่วยลดโอกาสเกิดปัญหาที่เกี่ยวข้องกับสุขภาพจิตและสุขภาพร่างกาย
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">แหล่งที่มา https://ontario.cmha.ca/documents/connection-between-mental-and-physical-health</Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">
                          วันที่เผยแพร่ 4 เมษายน 2565
                        </Typography>
                        <br/>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar/>
            </ThemeProvider>
        </div>
    );
};
export default ArticleBlogC;
