import React, { useState, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Fab from "@mui/material/Fab";

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
          fontFamily: "Noto Sans,Kanit,sans-serif",
        },
      },
    },
  },
});

const ArticleBlogA = () => {
  let navigate = useNavigate();
  const handleClick = () => {
    console.log("error");
    navigate("/Article");
  };
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
      <ThemeProvider theme={theme}>
        <Bg />
        <Head />
        <Grid container justify="center">
          <ArrowBackIosNewIcon
            onClick={() => handleClick()}
            sx={{
              fontSize: 15,
              mt: 16,
              ml: -19,
              position: "absolute",
              cursor: "pointer",
            }}
          />
          <Image style={{ marginTop: 150 }}>
            <img src="/image/ar1.png" width="311px" height="228px" />
          </Image>
          <br />
          <Card sx={{ maxWidth: 500, marginTop: 45, marginBottom: 5 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                วิธีหลีกเลี่ยงอาการหมดไฟ
              </Typography>
              <Typography variant="h7" color="text.secondary">
                5 วิธีเพื่อลดความเครียดและอาการหมดไฟ
              </Typography>
              <Typography variant="h6" color="text.primary">
                1.พักก่อน
              </Typography>
              <Typography variant="h7" color="text.secondary">
                เราทุกคนควรที่จะต้องถอยซักหนึ่งก้าวและทำให้จิตใจปลอดโปร่งจากความคิดที่เลวร้ายหรือไร้เหตุผล
                ซึ่งอาจจะทำได้โดยหยุดพักระหว่างวันเพื่อยืดเส้นยืดสายหรือพูดคุยและใช้เวลากับคนคิดบวก
                นอกจากนี้ช่วงเวลาพักนั้นยังเป็นช่วงเวลาที่ดีสำหรับการใช้คิดไตร่ตรองว่าเราจะใช้เวลาที่เหลือของวันนั้นอย่างไรอีกด้วย
              </Typography>
              <Typography variant="h6" color="text.primary">
                2.ให้รางวัลตัวเอง
              </Typography>
              <Typography variant="h7" color="text.secondary">
                เราสามารถให้รางวัลตัวเองได้หลายวิธีเช่น
                กำหนดวันหยุดให้กับตัวเองหรือจะกำหนดช่วงเวลาแห่งความสุขที่จะได้ไปดื่มกาแฟกับเพื่อนที่ไม่ได้เจอกันนาน
                เป็นต้น เพราะเมื่อเรามีเป้าหมายบางอย่างที่ต้องรอในตอนท้ายของวัน
                เราจะมีแนวโน้มที่จะจดจ่อกับงานและออกจากที่ทำงานตรงเวลามากขึ้น
              </Typography>
              <Typography variant="h6" color="text.primary">
                3.ปิดการแจ้งเตือน
              </Typography>
              <Typography variant="h7" color="text.secondary">
                เมื่อพ้นเวลาการทำงานของเราไปให้เราลองปิดการแจ้งเตือนและปิดหน้าจอคอมพิวเตอร์หรือมือถือก่อนนอนอย่างน้อย1ชั่วโมง
                จะช่วยให้เรานอนหลับได้ดีขึ้นและเพลิดเพลินไปกับเวลาว่างที่มี
              </Typography>
              <Typography variant="h6" color="text.primary">
                4. จดจ่อกับสิ่งที่ควบคุมได้
              </Typography>
              <Typography variant="h7" color="text.secondary">
                การเขียนรายการสิ่งที่เราไม่ชอบหรือสิ่งที่ทำให้เราท้อใจ
                และวงกลมรายการที่เราสามารถควบคุมมันได้จะช่วยให้เรามุ่งความสนใจไปที่สิ่งที่เราสามารถเปลี่ยนแปลงได้
                และทำให้เรามีกำลังใจในการทำงานมากขึ้น
              </Typography>
              <Typography variant="h6" color="text.primary">
                5. ใส่ใจกับสิ่งอื่นๆบ้าง
              </Typography>
              <Typography variant="h7" color="text.secondary">
                นอกจากการทำงานแล้ว การมีงานอดิเรก การใส่ใจกับตัวเอง เช่น
                การทานอาหารที่มีประโยชน์และการออกกำลังกาย เป็นต้น
                ก็สามารถช่วยให้เราหายเหนื่อยจากการการทำงานได้
              </Typography>
              <br />
              <Typography variant="h7" color="text.primary">
                แหล่งที่มา https://www.psycom.net/avoiding-burnout
              </Typography>
              <br />
              <br />
            </CardContent>
          </Card>
        </Grid>
        <BottomNavigationBar />
      </ThemeProvider>
    </div>
  );
};
export default ArticleBlogA;
