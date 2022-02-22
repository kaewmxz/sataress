import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TodayIcon from '@mui/icons-material/Today';
import Fab from '@mui/material/Fab';
import BottomNavigation from '@mui/material/BottomNavigation';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";

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
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={10}>
          <BottomNavigation>
            <Link to="/">
              <HomeIcon color="Black"
                sx={{ fontSize: 35, mx: 2, mt: 1.5 }} />
            </Link>
            <Link to="/Interventions">
              < SelfImprovementIcon color="Black"
                sx={{ fontSize: 35, mx: 2, mt: 1.5 }} />
            </Link>
            <Link to="/Moodtrack">
              <Fab size="large"
                sx={{ mx: 2, mt: -3 }}>
                <img src="./image/transparent_bg.png" width="70"></img>
              </Fab>
            </Link>
            <Link to="/Log">
              <MenuBookIcon color="Black"
                sx={{ fontSize: 35, mx: 2, mt: 1.5 }} />
            </Link>
            <Link to="/Calendar">
              <TodayIcon color="Black"
                sx={{ fontSize: 35, mx: 2, mt: 1.75 }} />
            </Link>
          </BottomNavigation>
        </Paper>
      </ThemeProvider>
    </div>
  );
}