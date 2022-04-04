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
            <ThemeProvider theme={theme}>
            <Bg />
            <Head />
            <Grid container justify="center">
            <ArrowBackIosNewIcon
                    onClick = {() => handleClick()}
                    sx={{ fontSize: 15, mt: 15, ml: -20, position: "absolute", cursor:"pointer" }} color="gray" />
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/arco2.png" width="320.7px" height="182px" />
                </Image>
                <br/>
                <Card sx={{ maxWidth: 450, marginTop: 45,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                        วิธีหยุดความคิดเชิงลบ
                        </Typography>
                        <Typography variant="h6" color="text.primary" >1. ลองจินตนาการถึงภาพป้ายหยุด</Typography>
                        <Typography variant="h7" color="text.secondary" >
                        สิ่งนี้สามารถช่วยให้หยุดความคิดเชิงลบที่จะเกิดขึ้นได้ ดร.เบรนเนอร์กล่าวว่า “การแสดงภาพของการเบี่ยงเบนตามตัวอักษร สามารถช่วยดึงความสนใจของคุณออกจากความคิดเชิงลบได้” 
                        อีกทั้งคุณยังสามารถเบี่ยงเบนความสนใจของตัวเองได้โดยการ ฟังเพลง ไปเดินเล่น จินตนาการถึงความทรงจำดีๆ โทรหาเพื่อน หรือการไปทำสิ่งอื่นที่คุณสามารถหมกมุ่นอยู่กับสิ่งที่มีประสิทธิภาพมากขึ้น 
                        จะช่วยสร้างความภาพภูมิใจในตนเองและยังทำให้คุณมองภาพในแง่บวกอีกด้วย
                        </Typography>
                        <Typography variant="h6" color="text.primary" >2. อยากรู้อยากเห็น ไม่วิจารณ์ตัวเอง</Typography>
                        <Typography variant="h7" color="text.secondary">
                        นี่เป็นวิธีแสดงความรักต่อตัวเองเมื่อเกิดความไม่สบายใจ ดร.เบรนเนอร์กล่าวว่า “การหยุดเห็นอกเห็นใจตัวเองเป็นสิ่งที่ทำให้ไขว้เขว การหยุดชะงัก และยังเป็นวิธีเปลี่ยนการทำงานของสมอง” 
                        จากการศึกษาพบว่า เมื่อเวลาผ่านไป การปฏิบัติที่ยึดถือความเห็นอกเห็นใจ เช่น การให้กำลังใจตัวเองในเชิงบวก ไม่ว่าจะเป็น “ฉันทำดีที่สุดแล้ว” หรือ “ฉันทุ่มเทให้กับตัวเองจริงๆ” 
                        สามารถช่วยได้มากในการเปลี่ยนวิธีที่สมองตอบสนองต่อความคิดเชิงลบ โดยการลดความคิดวิพากษ์วิจารณ์ตนเองและความวิตกกังวล
                        </Typography>
                        <Typography variant="h6" color="text.primary">3. ให้ความสนใจกับความคิดของตัวเอง</Typography>
                        <Typography variant="h7" color="text.secondary" >
                        คุณเคยนึกมั้ยว่า ยิ่งพยามยามไม่คิดอะไรมากเท่าไหร่ก็ยิ่งคิดถึงมันมากเท่านั้น ดร.นารากอน เกนนีย์ กล่าวว่า“เมื่อผู้คนพยายามผลักไสอารมณ์ด้านลบออกไป พวกเขาจะแข็งแกร่งขึ้นโดยไม่ตั้งใจ” 
                        จากการศึกษาแสดงให้เห็นว่าการมีสติโดยการให้เกียรติและยอมรับความคิดนั้น หรือพยายามที่จะผ่านมันด้วยวิธีที่สร้างสรรค์ สามารถช่วยให้แก้ไขปัญหาพื้นฐานได้ และเธอยังได้กล่าวอีกว่า “ฝึกสังเกตความคิดโดยไม่ต้องด่วนตัดสิน” 
                        เราต้องพยายามทำความเข้าใจว่าทำไมการคิดแบบนี้ถึงเป็นปัญหา เช่น ความคิดนี้ถูกต้องหรือไม่ ความคิดนี้มีประโยชน์หรือไม่ การใช้มุมมองทางปัญญาสามารถช่วยให้คุณปลูกฝังวิธีคิดและความรู้สึกที่ถูกต้องและเป็นประโยชน์มากขึ้น
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary" style={{wordWrap:"break-word"}}>แหล่งที่มา https://www.psycom.net/negative-thinking</Typography>
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
export default ArticleBlogB;
