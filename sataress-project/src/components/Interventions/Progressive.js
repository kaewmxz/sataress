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

const Btn = withTheme(styled.div`
text-align:center;
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

const Progressive = () => {
    let navigate = useNavigate();
    const handleClick = () => {
        console.log("error")
        navigate("/Interventions");
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
            <img src = "../image/backicon.png"
            onClick={() => handleClick()}
            width = "22"
           style = {{
               marginTop:160,
               marginLeft:-165,
              position: "absolute",
              cursor: "pointer",
            }}
          /> 
                <Image style={{ marginTop: 170 }}>
                    <img src="/image/Prog.png" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 50,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Progressive muscle relaxation
                        </Typography>
                        <Typography variant="h7" color="text.secondary">
                            Progressive muscle relaxation (PMR) เป็นเทคนิคการผ่อนคลายกล้ามเนื้อ ทำให้เกิดการเกร็งและผ่อนคลายกล้ามเนื้อทีละส่วน ซึ่งช่วยในการปลดปล่อยความตึงเครียดของร่างกายซึ่งสามารถช่วยบรรเทาความเครียดและความวิตกกังวล
                            กรอบการทำงานสำหรับการได้รับการผ่อนคลายในระดับนี้จัดทำโดย PMR จำเป็นต้องเน้นกลุ่มกล้ามเนื้อทีละส่วน ช่วยให้คุณตระหนักถึงความเครียดในสถานที่นั้นๆ
                            <br/>
                            ก่อนผ่อนคลาย ควรเกร็งกล้ามเนื้อแต่ละส่วนด้วย การกระทำนี้ช่วยเพิ่มบรรยากาศที่ผ่อนคลายของพื้นที่
                            <br/>
                            PMR ได้รับการพิสูจน์ในการศึกษาแล้วว่ามีประโยชน์หลายประการ รวมถึงการบรรเทาอาการปวดและการนอนหลับที่ดีขึ้น อาการไมเกรนกำเริบ ความดันโลหิตซิสโตลิก และอาการ TMJ อาจลดลงทั้งหมด
                            <br/>
                            PMR สามารถทำได้ในความเป็นส่วนตัวของบ้านของคุณเอง เพื่อผลลัพธ์สูงสุด ให้ฝึกวิธีนี้เป็นประจำ มันอาจทำให้คุณรู้สึกผ่อนคลายและจิตใจสงบขึ้นเมื่อเวลาผ่านไป
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">
                            แหล่งที่มา https://www.healthline.com/health/progressive-muscle-relaxation
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">
                            วันที่เผยแพร่ 4 เมษายน 2565
                        </Typography>
                        <br/>
                        <Btn>
                            <button style={{ fontSize: 18, color: "#FE440A" , fontFamily:'Noto Sans,Kanit,sans-serif', border: "none", background:"none"}}>Play</button>
                        </Btn>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar />
            </ThemeProvider>
        </div>
    );
};
export default Progressive;

