import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import BottomNavigationBar from "./BottomNavigationBar ";
import Header from "./Head";
import { AuthContext } from "./Auth";
import { BarChart, Bar, XAxis, YAxis, Cell, LabelList } from "recharts";
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
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(255, 0, 0, 0.25);
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
  height: 240px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(255, 0, 0, 0.25);
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
  box-shadow: 0px 4px 4px rgba(255, 0, 0, 0.25);
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
const barColors = [
  "#F3DD8C",
  "#FD9D74",
  "#F57474",
  "#96DBA5",
  "#8590EF",
  "#5CB7BD",
  "#55D6DE",
  "#F9ACF1",
];

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

      const countResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.emoji = "😡";
        }
        return o;
      });

      setmoodCount(countResult);
    };

    const fetchmoodIntense = async () => {
      const result = await axios.get("http://localhost:4000/mood-intense/", {
        params: { id: currentUser.uid, range: variables },
      });

      const intensityResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.emoji = "😡";
        }
        return o;
      });
      setmoodIntense(intensityResult);
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

      const countResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.emoji = "😡";
        }
        return o;
      });

      setmoodCount(countResult);
    };

    const fetchmoodIntense = async () => {
      const result = await axios.get("http://localhost:4000/mood-intense/", {
        params: { id: currentUser.uid, range: values },
      });

      const intensityResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.emoji = "😡";
        }
        return o;
      });
      setmoodIntense(intensityResult);
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
  console.log(moodIntense);

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
              <GraphBoxname1>นับจำนวนอารมณ์</GraphBoxname1>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -30, marginTop: 35 }}
              >
                <BarChart width={290} height={200} data={moodCount}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="mood"
                    type="category"
                    textAnchor="end"
                    verticalAnchor="middle"
                    interval={0}
                    angle={-26.4}
                    fontSize={12}
                  />
                  <YAxis minTickGap={1} scale="linear" />
                  <Bar dataKey="count" fill="#84c78b">
                    {moodCount.map((entry, index) => (
                      // <Cell
                      //   key={`cell-${index}`}
                      //   fill={barColors[index % 20]}
                      // />
                      <Cell
                        fill={
                          moodCount[index].mood === "Happy"
                            ? barColors[0]
                            : moodCount[index].mood === "Surprised"
                            ? barColors[1]
                            : moodCount[index].mood === "Stressed"
                            ? barColors[6]
                            : moodCount[index].mood === "Disgusted"
                            ? barColors[3]
                            : moodCount[index].mood === "Fearful"
                            ? barColors[4]
                            : moodCount[index].mood === "Sad"
                            ? barColors[5]
                            : moodCount[index].mood === "Angry"
                            ? barColors[2]
                            : moodCount[index].mood === "Neutral"
                            ? barColors[7]
                            : "#0"
                        }
                      />
                    ))}
                    <LabelList dataKey="emoji" position="inside" />
                  </Bar>
                </BarChart>
              </Grid>
            </GraphBox1>

            <GraphBox2 style={{ marginTop: 500 }}>
              <GraphBoxname2>ความเข้มข้นเฉลี่ยของแต่ละอารมณ์</GraphBoxname2>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -30, marginTop: 35 }}
              >
                <BarChart width={290} height={200} data={moodIntense}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="mood"
                    textAnchor="end"
                    verticalAnchor="middle"
                    interval={0}
                    angle={-26.4}
                    fontSize={12}
                  />
                  <YAxis
                    minTickGap={1}
                    domain={[0, "dataMax"]}
                    scale="linear"
                  />
                  <Bar dataKey="average" fill="#84c78b">
                    {moodIntense.map((entry, index) => (
                      <Cell
                        fill={
                          moodCount[index].mood === "Happy"
                            ? barColors[0]
                            : moodCount[index].mood === "Surprised"
                            ? barColors[1]
                            : moodCount[index].mood === "Stressed"
                            ? barColors[6]
                            : moodCount[index].mood === "Disgusted"
                            ? barColors[3]
                            : moodCount[index].mood === "Fearful"
                            ? barColors[4]
                            : moodCount[index].mood === "Sad"
                            ? barColors[5]
                            : moodCount[index].mood === "Angry"
                            ? barColors[2]
                            : moodCount[index].mood === "Neutral"
                            ? barColors[7]
                            : "#0"
                        }
                      />
                    ))}
                    <LabelList dataKey="emoji" position="inside" />
                  </Bar>
                </BarChart>
              </Grid>
            </GraphBox2>

            <GraphBox3 style={{ marginTop: 780 }}>
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
