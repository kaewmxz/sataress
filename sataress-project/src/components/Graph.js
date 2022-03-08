import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BottomNavigationBar from "./BottomNavigationBar ";
import Header from "./Head";
import { AuthContext } from "./Auth";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import axios from "axios";
import ReactWordcloud from "react-wordcloud";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import DateRangePicker from "@mui/lab/DateRangePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import moment from "moment";

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

const date = new Date();
const minDate = new Date("2022-01-01T00:00:00.000");
const maxDate = new Date("2022-12-31T00:00:00.000");

const Graph = () => {
  const { currentUser } = useContext(AuthContext);
  const [moodCount, setmoodCount] = useState([]);
  const [moodIntense, setmoodIntense] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  const [value, setValue] = React.useState([null, null]);

  useEffect(() => {
    if (currentUser) {
      const variables = [
        moment(date).clone().startOf("month").format("M/D/YYYY"),
        moment(date).clone().endOf("month").format("MM/D/YYYY"),
      ];

      const fetchmoodCount = async () => {
        const result = await axios.get("http://localhost:4000/mood/", {
          params: { id: currentUser.uid, range: variables },
        });

        setmoodCount(result.data.message);
      };

      const fetchmoodIntense = async () => {
        const result = await axios.get("http://localhost:4000/mood-intense/", {
          params: { id: currentUser.uid, range: variables },
        });

        setmoodIntense(result.data.message);
      };

      const fetchgratitude = async () => {
        const result = await axios.get("http://localhost:4000/gratitude/", {
          params: { id: currentUser.uid, range: variables },
        });

        setGratitude(result.data.message);
      };
      fetchmoodCount();
      fetchmoodIntense();
      fetchgratitude();
    }
  }, []);

  const SimpleWordcloud = () => {
    return (
      <ReactWordcloud
        style={{ maxWidth: 300, maxHeight: 180, paddingBottom: 100 }}
        words={gratitude}
      />
    );
  };
  console.log(value);

  const handleSubmit = async (values) => {
    const fetchmoodCount = async () => {
      const result = await axios.get("http://localhost:4000/mood/", {
        params: { id: currentUser.uid, range: values },
      });

      setmoodCount(result.data.message);
    };

    const fetchmoodIntense = async () => {
      const result = await axios.get("http://localhost:4000/mood-intense/", {
        params: { id: currentUser.uid, range: values },
      });

      setmoodIntense(result.data.message);
    };

    const fetchgratitude = async () => {
      const result = await axios.get("http://localhost:4000/gratitude/", {
        params: { id: currentUser.uid, range: values },
      });

      setGratitude(result.data.message);
    };
    fetchmoodCount();
    fetchmoodIntense();
    fetchgratitude();
  };

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }

  return (
    <div>
      <Bg />
      <Header />
      {/* Monthly or Weekly button */}
      <ThemeProvider theme={theme}>
        <Box component="span">
          <Grid container justify="center" direction="row">
            {/* Time range */}
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText="Beginning date"
                endText="End date"
                value={value}
                minDate={minDate}
                maxDate={maxDate}
                disableFuture={true}
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                onAccept={(newValue) => {
                  handleSubmit(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>

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
            <GraphBox3 style={{ marginTop: 670 }}>
              <SimpleWordcloud />
            </GraphBox3>
          </Grid>
        </Box>
      </ThemeProvider>
      <BottomNavigationBar />
    </div>
  );
};
export default Graph;
