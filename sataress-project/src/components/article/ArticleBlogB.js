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
width: 320.7px;
height: 182px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`);



const ArticleBlogB = () => {
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
            <Bg />
            <Head />
            <Grid container justify="center">
            <ArrowBackIosNewIcon
                    onClick = {() => handleClick()}
                    sx={{ fontSize: 15, mt: 15, ml: -20, position: "absolute", cursor:"pointer" }} color="gray" />
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/Boxb.png" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 45,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        แผนการคลายเครียดง่ายๆ ที่โต๊ะทำงานสามารถทำได้ 4 ขั้นตอน
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>1. แบ่งงานตามลักษณะออกเป็น 3 กลุ่ม</Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                           <li>งานเร่งด่วน - งานต้องรีบทำโดยทันที</li>
                           <li>งานประจำ - งานปกติที่ต้องรับผิดชอบตามหน้าที่</li>
                           <li>งานสร้างสรรค์เพิ่มพลังเชิงบวก - งานทำแล้วคลายเครียด</li>
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>2. ใช้กระดาษเปล่า 1 แผ่น เขียนตารางนี้ลงในกระดาษแล้วเอารายการงานที่ต้องทำมาเขียนลง ตามช่อง แบ่งตามลักษณะงานและความสำคัญ</Typography>
                        <img src="/image/blog2.jpg" width="350px"/>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>3. รวมวิธีคลายเครียดง่ายๆ ที่ชอบเพื่อใส่ไว้ในแผนการทำงานด้วย</Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        การฝึกหายใจ (Breathing exercise) - วิธีการ นั่งในท่าที่สบายหลับตา เอามือประสานไว้บริเวณหน้าท้อง ค่อยๆ หายใจเข้าให้ลึกพร้อมกับนับ 1 ถึง 3 ในใจช้าๆ กลั้นหายใจนับ 1 ถึง 3 ค่อยๆ ผ่อนลมหายใจออก นับ 1 ถึง 4 ช้าๆ ทำซ้ำติดต่อกัน 4-5 ครั้ง
                        <br/>การจินตนาการ (Visualization) - วิธีการ นั่งบนเก้าอี้ในท่าที่สบาย จากนั้นหลับตา ทำจิตใจให้สงบ จินตนาการถึง สิ่งแวดล้อมที่ทำให้เกิดความรู้สึกสบายผ่อนคลาย เช่น ท้องฟ้า สายน้ำ น้ำตก ทะเล เป็นต้น เมื่อจินตนาการจนจิตใจสงบขึ้นแล้ว ให้หายใจเข้าลึก ออกยาว พร้อมกับบอกสิ่งดีๆ กับตัวเอง เช่น “ฉันทำได้ ฉันมีความสามารถ ฉันสามารถผ่านอุปสรรคไปได้” แล้วนับ 1, 2, 3 ค่อยๆ ลืมตาขึ้น
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>4. ลงมือปฏิบัติ</Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                        เมื่อวางแผนทุกอย่างเรียบร้อย ส่วนสำคัญที่สุด คือ การลงมือปฏิบัติอย่างสม่ำเสมอและต่อเนื่อง
                        </Typography>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar/>
        </div>
    );
};
export default ArticleBlogB;
