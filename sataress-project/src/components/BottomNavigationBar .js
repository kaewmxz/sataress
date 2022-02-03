import * as React from 'react';
import { withTheme } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";
import HomeIcon from '@mui/icons-material/Home';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Fab from '@mui/material/Fab';

import { Link } from "react-router-dom";

const Box = withTheme(styled.div`
position: fixed;
display:flex;
width: 414px;
height: 79.44px;
background: #FFE9E9;
box-shadow: inset 0px 4px 4px rgba(251, 24, 24, 0.36);
border-radius: 23px 23px 0px 0px;
flex-grow:1;
`);


const theme = createTheme({
  palette: {
    Black: {
      main: '#212121',
  },
},
});


export default function BottomNavigationBar() {
  return (
    <div>
      <Box>
      <ThemeProvider theme={theme}>
        <Link to="/">
          <HomeIcon color = "Black"
            sx={{ fontSize: 40, mt: 3, ml: 4 }} />
        </Link>
        <Link to="/">
          <HealthAndSafetyIcon color = "Black"
            sx={{ fontSize: 40, mt: 3, ml: 4 }} />
        </Link>
        <Link to="/Moodtrack">
        <Fab  size = "large"
            sx={{ mt: -5, ml: 4 }} >
            <img src="./image/wlogo.png" width="85"></img>
          </Fab>
        </Link>
        <Link to="/">
          <MenuBookIcon color = "Black"
            sx={{ fontSize: 40, mt: 3, ml: 4 }} />
        </Link>
        <Link to="/">
          <CalendarTodayIcon color = "Black"
            sx={{ fontSize: 40, mt: 3, ml: 4 }} />
        </Link>
        </ThemeProvider>
      </Box>
    </div>
  );
}