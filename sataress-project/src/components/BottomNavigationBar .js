import * as React from 'react';
import { withTheme } from "@material-ui/core/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styled from "styled-components";
import HomeIcon from '@mui/icons-material/Home';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Fab from '@mui/material/Fab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import { Link } from "react-router-dom";

// const Box = withTheme(styled.div`
// position: fixed;
// display:flex;
// width: 414px;
// height: 79.44px;
// background: #FFE9E9;
// box-shadow: inset 0px 4px 4px rgba(251, 24, 24, 0.36);
// border-radius: 23px 23px 0px 0px;
// padding-bottom: 0px;
// margin: 0px 0px 0px 0px;
// z-index: 1;
// ${(props) => props.theme.breakpoints.up("xs")} {
//   margin-left: 0px;
// }
// ${(props) => props.theme.breakpoints.up("sm")} {
//   margin-left: 96px;
// }
// ${(props) => props.theme.breakpoints.up("md")} {
//   margin-left: 276px;
// }
// ${(props) => props.theme.breakpoints.up("lg")} {
//   margin-left: 436px;
// }
// ${(props) => props.theme.breakpoints.up("xl")} {
//   margin-left: 756px;
// }
// `);


const theme = createTheme({
  palette: {
    Black: {
      main: '#212121',
    },
    Pink: {
      main: '#f8bbd0',
    },
  },
});


export default function BottomNavigationBar() {
  return (
    <div>
        <ThemeProvider theme={theme}>
          <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
              <BottomNavigation>
            <Link to="/">
              <HomeIcon color="Black"
                sx={{ fontSize: 40, mt: 3, ml: 4 }} />
            </Link>
            <Link to="/Intervention">
              <HealthAndSafetyIcon color="Black"
                sx={{ fontSize: 40, mt: 3, ml: 4 }} />
            </Link>
            <Link to="/Moodtrack">
              <Fab size="large"
                sx={{ mt: -5, ml: 4 }} >
                <img src="./image/wlogo.png" width="85"></img>
              </Fab>
            </Link>
            <Link to="/">
              <MenuBookIcon color="Black"
                sx={{ fontSize: 40, mt: 3, ml: 4 }} />
            </Link>
            <Link to="/">
              <CalendarTodayIcon color="Black"
                sx={{ fontSize: 40, mt: 3, ml: 4 }} />
            </Link>
            </BottomNavigation>
            </Paper>
        </ThemeProvider>
    </div>
  );
}