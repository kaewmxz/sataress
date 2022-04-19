import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Fab from "@mui/material/Fab";
import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";

const theme = createTheme({
  palette: {
    Black: {
      main: "#212121",
    },
    Pink: {
      main: "#f8bbd0",
    },
  },
});

export default function BottomNavigationBar() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={10}
        >
          <BottomNavigation
            style={{
              boxShadow: "inset 0px 4px 4px rgba(251, 24, 24, 0.36)",
              borderRadius: 5,
              background: "#FFE9E9",
            }}
          >
            <Link to="/">
              <img
                src="../image/home.avif"
                width="30"
                height="30"
                style={{ marginTop: 13, marginLeft: 15, marginRight: 15 }}
              />
            </Link>
            <Link to="/Log">
              <img
                src="../image/log-file.avif"
                width="30"
                height="30"
                style={{ marginTop: 13, marginLeft: 15, marginRight: 15 }}
              />
            </Link>
            <Link to="/Moodtrack">
              <Fab size="large" sx={{ mx: 2, mt: -3 }}>
                <img src="./image/transparent_bg.avif" width="70" height="70"></img>
              </Fab>
            </Link>
            <Link to="/Interventions">
              <img
                src="../image/relaxation.avif"
                width="30"
                height="30"
                style={{ marginTop: 13, marginLeft: 15, marginRight: 15 }}
              />
            </Link>
            <Link to="/Article">
              <img
                src="../image/novel.avif"
                width="30"
                height="30"
                style={{ marginTop: 13, marginLeft: 15, marginRight: 15 }}
              />
            </Link>
          </BottomNavigation>
        </Paper>
      </ThemeProvider>
    </div>
  );
}
