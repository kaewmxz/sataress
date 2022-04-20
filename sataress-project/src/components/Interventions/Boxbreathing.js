import React, { useContext, useState } from "react";
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
import PopupBox from "./PopBox";
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

const Boxbreathing = () => {
    let navigate = useNavigate();
    const handleClick = () => {
        console.log("error")
        navigate("/Interventions");
    };
    const [openInfo, setOpenInfo] = useState(false);
    const handleClickOpenInfo = () => {
        setOpenInfo(true);
        console.log("click")
        return (
            <div>
                 <iframe
                    src="https://youtu.be/zbjzsRckIE8"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen
                    title="video"
                />{" "}
            </div>
        )
    };

    const handleCloseInfo = () => {
        setOpenInfo(false);
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
                    <img src="/image/Boxb.avif" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 50,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Box breathing
                        </Typography>
                        <Typography variant="h7" color="text.secondary">
                            Box Breathing หรือที่เรียกว่า Square Breathing เป็นเทคนิคการหายใจลึกๆ ที่สามารถช่วยในการหายใจช้าลง มันทำงานโดยเบี่ยงเบนความสนใจในขณะที่นับถึงสี่ ทำให้ระบบประสาทสงบลง และบรรเทาความเครียดในร่างกาย ข้อดีของการหายใจแบบกล่อง ได้แก่ ความสามารถในการจัดการกับความตื่นตระหนกและความเครียดเมื่อรู้สึกหนักใจ เช่นเดียวกับความสามารถในการนอนหลับเมื่อมีอาการนอนไม่หลับ นอกจากนี้ยังช่วยลดคอร์ติซอล (ฮอร์โมนความเครียด) ซึ่งช่วยลดความดันโลหิตและทำให้อารมณ์ดีขึ้น
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">
                            แหล่งที่มา : 
                            <a href = "https://www.webmd.com/balance/what-is-box-breathing" style={{color:"gray"}}>https://www.webmd.com/balance/what-is-box-breathing</a>
                        </Typography>
                        <br/>
                        <Typography variant="h7" color="text.primary">
                            วันที่เผยแพร่ 4 เมษายน 2565
                        </Typography>
                        <br/>
                        <Btn>
                            <PopupBox/>
                        </Btn>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar/>
            </ThemeProvider>
        </div>
    );
};
export default Boxbreathing;
