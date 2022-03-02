import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BottomNavigationBar from "./BottomNavigationBar ";
import Header from "./Head";
import { AuthContext } from "./Auth";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from 'recharts';
import axios from 'axios';
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

const Toggle = withTheme(styled.div`
  position: absolute;
  top: 142px;
`);

const GraphBox1 = withTheme(styled.div`
  position: absolute;
  width: 307px;
  height: 182px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);
const GraphBox2 = withTheme(styled.div`
  position: absolute;
  width: 307px;
  height: 182px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const GraphBox3 = withTheme(styled.div`
  position: absolute;
  width: 307px;
  height: 182px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 17px;
  ${(props) => props.theme.breakpoints.only("xs")} {
    padding: 0px;
  }
`);

const theme = createTheme({
  palette: {
    Wbutton: {
      main: "#FF8080",
      contrastText: "#ffff",
    },
    Mbutton: {
      main: "#FF8080",
      contrastText: "#ffff",
    },
  },
});
const Graph = () => {
  const { currentUser } = useContext(AuthContext);
  const [moodCount, setmoodCount] = useState([]);
  const [moodIntense, setmoodIntense] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  useEffect(() => {
    if (currentUser) {
      const fetchmoodCount = async () => {
        const result = await axios.get("http://localhost:4000/mood/", {
          params: { id: currentUser.uid },
        });

        setmoodCount(result.data.message);
      };
      const fetchmoodIntense = async () => {
        const result = await axios.get("http://localhost:4000/mood-intense/", {
          params: { id: currentUser.uid },
        });

        setmoodIntense(result.data.message);
      };
      const fetchgratitude = async () => {
        const result = await axios.get("http://localhost:4000/gratitude/", {
          params: { id: currentUser.uid },
        });

        setGratitude(result.data.message);
      };
      fetchmoodCount();
      fetchmoodIntense();
      fetchgratitude();
    }
  }, []);
  const SimpleWordcloud = () => {
    return <ReactWordcloud words={gratitude} />;
  };
  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = useState("web");
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
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
      <Header />
      {/* Monthly or Weekly button */}
      <ThemeProvider theme={theme}>
        <Box component="span">
          <Grid container justify="center" direction="row">
            <Toggle>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
              >
                <ToggleButton color = "Wbutton" value="weekly">สัปดาห์</ToggleButton>
                <ToggleButton color = "Mbutton" value="monthly">เดือน</ToggleButton>
              </ToggleButtonGroup>
            </Toggle>
            <GraphBox1 style={{ marginTop: 230 }}>
              <BarChart width={307} height={182} data={moodCount}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mood" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </GraphBox1>
            <GraphBox2 style={{ marginTop: 450 }}>
              <BarChart width={307} height={182} data={moodIntense}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mood" />
                <YAxis />
                <Bar dataKey="average" fill="#8884d8" />
              </BarChart>
            </GraphBox2>
            <GraphBox3 style={{ marginTop: 670}}>
              <SimpleWordcloud />
            </GraphBox3 >
          </Grid>
        </Box>
      </ThemeProvider>
      <BottomNavigationBar />
    </div>
  );
};
export default Graph;
