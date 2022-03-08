import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BottomNavigationBar from "./BottomNavigationBar ";
import Header from "./Head";
import { AuthContext } from "./Auth";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
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
const GraphBoxname1 = withTheme(styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 12px;
  color: #84c78b;
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
const GraphBoxname2 = withTheme(styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 12px;
  color: #84c78b;
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

const GraphBoxname3 = withTheme(styled.div`
  position: absolute;
  margin-top: 10px;
  margin-left: 12px;
  color: #84c78b;
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
const barColors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#84c78b", "#1f77b4", "#ff7f0e", "#2ca02c", "#84c78b"];

const Graph = () => {
  const { currentUser } = useContext(AuthContext);
  const [moodCount, setmoodCount] = useState([]);
  const [moodIntense, setmoodIntense] = useState([]);
  const [gratitude, setGratitude] = useState([]);
  const [value, setValue] = React.useState([null, null]);

  useEffect(() => {
    if (currentUser) {
      handleClose();
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

  const handleClose = async () => {
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
  };

  const handleSubmit = async (values) => {
    if (values[0] == null || values[1] == null) {
      values[0] = moment(date).clone().startOf("month").format("M/D/YYYY");

      values[1] = moment(date).clone().endOf("month").format("MM/D/YYYY");
    }
    console.log(values);
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
              <Grid
                container
                justify="center"
                style={{ marginTop: 110, padding: 30 }}
              >
                <DateRangePicker
                  startText="Start date"
                  endText="End date"
                  value={value}
                  minDate={minDate}
                  maxDate={maxDate}
                  disableFuture={true}
                  disableCloseOnSelect={false}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  onAccept={(newValue) => {
                    handleSubmit(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 3 }}> to </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </Grid>
            </LocalizationProvider>

            <GraphBox1 style={{ marginTop: 230, color: "red" }}>
              <GraphBoxname1>นับอารมณ์</GraphBoxname1>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -30, marginTop: 35 }}
              >
                <BarChart width={290} height={130} data={moodCount}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="mood" textAnchor= "end"  verticalAnchor= "middle" interval={0} angle={-26.4} fontSize={12} />
                  <YAxis />
                  <Bar dataKey="count" fill="#84c78b">
                    {moodCount.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % 20]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </Grid>
            </GraphBox1>

            <GraphBox2 style={{ marginTop: 450 }}>
              <GraphBoxname2>ความเข้มข้นเฉลี่ยของแต่ละอารมณ์</GraphBoxname2>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -30, marginTop: 35 }}
              >
                <BarChart width={290} height={140} data={moodIntense}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="mood" textAnchor= "end"  verticalAnchor= "middle" interval={0} angle={-26.4} fontSize={12} />
                  <YAxis />
                  <Bar dataKey="average" fill="#84c78b">
                    {moodIntense.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={barColors[index % 20]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </Grid>
            </GraphBox2>

            <GraphBox3 style={{ marginTop: 670 }}>
              <GraphBoxname3>Wordcloud</GraphBoxname3>
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
