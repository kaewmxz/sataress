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
import { makeStyles } from '@mui/styles';

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

const useStyles = makeStyles({
  root: {
    background: "#FFE9E9",
    boxShadow: "inset 0px 4px 4px rgba(251, 24, 24, 0.36)",
    borderRadius: 5,
  },
});


export default function BottomNavigationBar() {
  const classes = useStyles();
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper className={classes.root} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={10}>
          <BottomNavigation className={classes.root}>
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