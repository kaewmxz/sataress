import React, { useState, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Routes, Route, Navigate} from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

const Image = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`);

const ArticleBlogA = () => {
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
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/Boxb.png" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 45,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        ดูแลสุขภาพจิตของคุณด้วย 5 ขั้นตอน
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        1. ออกกำลังกายทางจิตใจ
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        การรักษาใจให้มีความยืดหยุ่น ขั้นตอนนี้เราสามารถดูแลจิตใจของเราให้มีความยืดหยุ่นได้ ด้วยการออกกำลังกายทางจิตใจ ไม่ว่าจะเป็นลองฝึกกิจกรรมที่ทดสอบจิตใจ ทั้งเล่นเกมด้วย หรือฟังดนตรีด้วย หากเคยอ่านหนังสือแบบทั่วไป ก็ลองเสริมอ่าน นวนิยายลึกลับที่ทดสอบจิตใจในหลากหลายอารมณ์ เพื่อสังเกตจิตใจของตนเองในสภาวะต่างๆ
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        2. เสริมสร้างความสัมพันธ์กับผู้อื่น
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        ความสัมพันธ์ของเราที่เกี่ยวข้องกับผู้อื่น ไม่ว่าจะเป็นครอบครัว หรือเพื่อนฝูง สังคมล้อมรอบเรา ให้เราเสริมสร้างชีวิตให้มีความสุข เปิดใจกับความรู้สึกของตนเอง และเข้าใจถึงจิตใจของผู้ที่ล้อมรอบตัวเรา รู้จักให้เวลาตนเอง และคนสำคัญในชีวิต ให้มีเวลา กิจกรรม ในการเสริมสร้างความสัมพันธ์ที่ดีต่อกัน
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        3. ทำตามความฝันของคุณให้ได้
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        บางครั้งชีวิตของคนเราในความเป็นชีวิตจริง อาจไม่มีโอกาสได้ทำตามความฝัน ดังนั้นให้เวลากับส่วนหนึ่งในชีวิตของคุณ ให้ได้ทำตามความสนใจในกิจกรรมที่คุณชอบ อาจจะเป็นการถ่ายรูปสวยๆ ในเวลาสบายๆ การทำอาหารในครัวเล็กๆ ในบ้านของคุณ ให้วันของคุณมีกิจกรรมที่คุณสนใจ ตามความฝันส่วนหนึ่งของคุณ
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        4. เรียนรู้วิธีเข้าใจอารมณ์ของตัวเอง
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        เรียนรู้ในการจัดการกับอารมณ์ในแต่ละขณะ ความรู้สึกเป็นสิ่งสำคัญ ควรมีเวลาแต่ละวันในการทำสมาธิ มุ่งเน้นจัดการความคิดในเชิงบวก จัดเรียงอารมณ์ ความรู้สึก ให้สามารถจัดการทั้งอารมณ์ที่ขุ่นมัว และอารมณ์รื่นเริงได้อย่างเข้าใจสภาวะจิตใจในแต่ละช่วงขณะ
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        5. เพิ่มกิจกรรมเพื่อสร้างความดี
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        กิจกรรมทำความดี จะทำให้เราได้รับพลังงานทางบวก เป็นพลังงานดีดี ที่จะปรับปรุงสภาพจิตใจของคุณ ให้มีความสุข ดังนั้นหากมีเวลาว่าง จงอย่ารีรอที่จะจัดสรรเวลานั้น อาจจะเป็นอาสาสมัครทำสิ่งดีๆ ให้กับน้องๆ ที่ขาดโอกาส ลองหากิจกรรมทำดี แล้วคุณจะรู้สึกถึงพลังงานบางอย่างที่เกิดขึ้นในตัวคุณ
                        </Typography>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar/>
        </div>
    );
};
export default ArticleBlogA;