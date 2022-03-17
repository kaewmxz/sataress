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
            <Bg />
            <Head />
            <Grid container justify="center">
                <ArrowBackIosNewIcon
                    onClick={() => handleClick()}
                    sx={{ fontSize: 15, mt: 15, ml: -20, position: "absolute", cursor: "pointer" }} color="gray" />
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/ar3.png" width="311px" height="228px" />
                </Image>
                <br/>
                <Card sx={{ maxWidth: 500, marginTop: 45, marginBottom: 5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
                        แค่ยิ้มและหัวเราะ ก็ทำให้ร่างกายผ่อนคลาย สุขภาพจิตดีขึ้น
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>การยิ้ม เป็นการลงทุน เพื่อสุขภาพกายและใจ</Typography>
                        <Typography variant="h7" color="text.secondary" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
                        เมื่อคุณยิ้มทุกครั้งจะกระตุ้นให้เกิดปฏิกิริยาทางเคมีในสมอง เพื่อปล่อยฮอร์โมนโดพามีน (Dopamine) และเซโรโทนิน (Serotonin) ออกมา
                        <br/>
                        โดพามีนส่งผลให้เกิดความรู้สึกมีความสุข ส่วนเซโรโทนินนั้นเกี่ยวข้องกับการผ่อนคลายความเครียด 
                        ซึ่งมีการศึกษาพบว่าผู้ที่มีปริมาณฮอร์โมนนี้ในระดับต่ำ จะสัมพันธ์กับอาการซึมเศร้าและก้าวร้าว
                        <br/>
                        ไม่ใช่เฉพาะด้านสุขภาพจิตเท่านั้น การยิ้มยังส่งผลให้สุขภาพกายดีขึ้นได้ด้วย
                        อาจทราบกันดีแล้วว่าความเครียดนั้นส่งผลให้ร่างกายมีภูมิต้านทานต่ำลง ในทางกลับกัน เมื่อมีความสุข 
                        ภูมิคุ้มกันก็จะแข็งแรงขึ้นได้ด้วย แต่สิ่งที่หลายคนอาจยังไม่รู้คือ "การยิ้ม" เป็นสัญญาณหนึ่งที่สมองจับเพื่อแปลผลว่าหมายถึงคุณมีความสุขอยู่ 
                        ถึงการยิ้มจะมีหลายแบบ เช่น ยิ้มออกมาจากใจ ยิ้มตามมารยาท ยิ้มแก้เขิน ยิ้มอย่างฝืนๆ แต่ไม่ว่าคุณจะยิ้มเช่นไร ผลลัพธ์ที่ร่างกายตอบสนองก็ไม่ต่างกัน
                        <br/>
                        ยังมีการศึกษาอีกมากมายที่บ่งชี้ให้เห็นประโยชน์อื่นๆ อีก เช่น การยิ้มช่วยให้ร่างกายตอบสนองความเครียดได้ดีขึ้น ทำให้อัตราการเต้นของหัวใจต่ำลง 
                        เมื่ออยู่ในสถานการณ์ตึงเครียด ช่วยลดความดันโลหิต ยิ่งไปกว่านั้น เพียงแค่ยิ้ม ก็สามารถยืดอายุให้ยืนยาวขึ้นได้ทีเดียว
                        <br/>
                        ผู้มีประสบการณ์หลายคนแนะนำว่า เพียงแค่ยิ้มให้ตัวเองหน้ากระจกทุกเช้า โดยอาจบอกถ้อยคำที่ให้กำลังใจตัวเองไปด้วย ก็จะกลายเป็นคนที่มีสมาธิดีขึ้น 
                        และมีความกล้าแสดงออกมากกว่าเดิม หรือบางครั้งถ้าเกิดเหตุการณ์ไม่เป็นใจขึ้นระหว่างวัน การยิ้มในช่วงเวลาสั้นๆ ก็สามารถช่วยปรับอารมณ์ให้ดีขึ้นได้
                        </Typography>
                        <Typography variant="h6" color="text.primary" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>ญาติสนิทของการยิ้มก็คือการหัวเราะ</Typography>
                        <Typography variant="h7" color="text.secondary" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>
                        การระเบิดเสียงหัวเราะออกมาย่อมหมายถึงจิตใจถูกเติมเต็มไปด้วยความสุขจนทะลักออกมา มักทำให้ทั้งตัวเองและคนรอบข้างรู้สึกอารมณ์ดีขึ้นตามไปด้วย แต่ไม่ใช่เพียงเท่านั้น สิ่งที่เกิดขึ้นทันทีเมื่อหัวเราะ คือการพาออกซิเจนเข้าสู่ร่างกาย ส่งผลถึงการกระตุ้นหัวใจ ปอด และกล้ามเนื้อ รวมถึงทำให้สมองหลั่งเอนดอร์ฟิน (Endorphine) ออกมามากขึ้น รวมทั้งเป็นการเพิ่มอัตราการเต้นของหัวใจและความดันโลหิตชั่วครู่ จากนั้นลดให้ต่ำลง ผลคือเกิดความรู้สึกผ่อนคลายตามมา
                        <br/>
                        การยิ้มเป็นสิ่งที่ลงทุนน้อยและได้ผลมาก ผู้ให้ก็มีความสุข ผู้รับก็สบายใจ รู้เช่นนี้แล้ว เราจึงควรยิ้มให้มากขึ้น เพราะแค่การยิ้มให้กันนิดๆ ในแต่ละวัน จะส่งผลดีต่อทั้งตัวคุณและสังคม
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary" fontFamily='Source Serif Pro, serif, Noto Sans Thai'>แหล่งที่มา https://hd.co.th/smiling-laughing-relaxes-the-body</Typography>
                        <br/>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar />
        </div>
    );
};
export default ArticleBlogC;
