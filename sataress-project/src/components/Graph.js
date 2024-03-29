import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Box } from "@material-ui/core";
import { Routes, Route, Navigate } from "react-router-dom";
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
  width: 350px;
  height: 280px;
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
  font-family: Noto Sans, Kanit, sans-serif;
  color: #84c78b;
`);
const GraphBox2 = withTheme(styled.div`
  position: absolute;
  width: 350px;
  height: 300px;
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
  font-family: Noto Sans, Kanit, sans-serif;
  color: #84c78b;
`);
const GraphBox3 = withTheme(styled.div`
  position: absolute;
  width: 350px;
  height: 200px;
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
  font-family: Noto Sans, Kanit, sans-serif;
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
  const [diffDay, setdiffDay] = useState([]);
  const [value, setValue] = React.useState([null, null]);

  useEffect(() => {
    if (currentUser) {
      handleClose();
    }
  }, []);

  const SimpleWordcloud = () => {
    return (
      <ReactWordcloud
        style={{
          maxWidth: 350,
          maxHeight: 150,
          paddingBottom: 110,
          margin: 30,
          position: "relative",
        }}
        words={gratitude}
        options={{
          fontFamily: "Noto Sans,Kanit,sans-serif",
          fontSizes: [13, 18],
          rotationAngles: [0, 20],
        }}
      />
    );
  };
  console.log(value);

  const handleClose = async () => {
    const variables = [
      moment(date).clone().startOf("month").format("M/D/YYYY"),
      moment(date).clone().endOf("month").format("MM/D/YYYY"),
    ];
    setValue(variables);
    const diffTime = Math.abs(new Date(variables[1]) - new Date(variables[0]));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setdiffDay(diffDays);
    const fetchmoodCount = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/mood/",
        {
          params: { id: currentUser.uid, range: variables },
        }
      );

      const countResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.mood = "มีความสุข";
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.mood = "เครียด";
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.mood = "เศร้า";
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.mood = "ประหลาดใจ";
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.mood = "หวาดกลัว";
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.mood = "รังเกียจ";
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.mood = "เฉยๆ";
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.mood = "โกรธ";
          o.emoji = "😡";
        }
        return o;
      });

      setmoodCount(countResult);
    };

    const fetchmoodIntense = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/mood-intense/",
        {
          params: { id: currentUser.uid, range: variables },
        }
      );

      const intensityResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.mood = "มีความสุข";
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.mood = "เครียด";
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.mood = "เศร้า";
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.mood = "ประหลาดใจ";
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.mood = "หวาดกลัว";
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.mood = "รังเกียจ";
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.mood = "เฉยๆ";
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.mood = "โกรธ";
          o.emoji = "😡";
        }
        return o;
      });
      setmoodIntense(intensityResult);
    };

    const fetchgratitude = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/gratitude/",
        {
          params: { id: currentUser.uid, range: variables },
        }
      );

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
    const diffTime = Math.abs(new Date(value[1]) - new Date(value[0]));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setdiffDay(diffDays);
    const fetchmoodCount = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/mood/",
        {
          params: { id: currentUser.uid, range: values },
        }
      );

      const countResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.mood = "มีความสุข";
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.mood = "เครียด";
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.mood = "เศร้า";
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.mood = "ประหลาดใจ";
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.mood = "หวาดกลัว";
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.mood = "รังเกียจ";
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.mood = "เฉยๆ";
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.mood = "โกรธ";
          o.emoji = "😡";
        }
        return o;
      });

      setmoodCount(countResult);
    };

    const fetchmoodIntense = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/mood-intense/",
        {
          params: { id: currentUser.uid, range: values },
        }
      );

      const intensityResult = result.data.message.map((o) => {
        if (o.mood == "Happy") {
          o.mood = "มีความสุข";
          o.emoji = "😊";
        } else if (o.mood == "Stressed") {
          o.mood = "เครียด";
          o.emoji = "😣";
        } else if (o.mood == "Sad") {
          o.mood = "เศร้า";
          o.emoji = "😭";
        } else if (o.mood == "Surprised") {
          o.mood = "ประหลาดใจ";
          o.emoji = "😯";
        } else if (o.mood == "Fearful") {
          o.mood = "หวาดกลัว";
          o.emoji = "😰";
        } else if (o.mood == "Disgusted") {
          o.mood = "รังเกียจ";
          o.emoji = "🤢";
        } else if (o.mood == "Neutral") {
          o.mood = "เฉยๆ";
          o.emoji = "😶";
        } else if (o.mood == "Angry") {
          o.mood = "โกรธ";
          o.emoji = "😡";
        }
        return o;
      });
      setmoodIntense(intensityResult);
    };

    const fetchgratitude = async () => {
      const result = await axios.get(
        "https://backend-glint.herokuapp.com/gratitude/",
        {
          params: { id: currentUser.uid, range: values },
        }
      );

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
              <GraphBoxname1>
                นับจำนวนอารมณ์ (ครั้ง) ในช่วง {diffDay} วัน
              </GraphBoxname1>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -20, marginTop: 60 }}
              >
                <BarChart width={330} height={210} data={moodCount}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="mood"
                    type="category"
                    textAnchor="end"
                    verticalAnchor="middle"
                    interval={0}
                    angle={-26.4}
                    fontSize={10}
                    fontFamily="Noto Sans,Kanit,sans-serif"
                  />
                  <YAxis
                    allowDecimals={false}
                    allowDataOverflow={true}
                    scale="auto"
                  />
                  <Bar dataKey="count" fill="#84c78b">
                    {moodCount.map((entry, index) => (
                      // <Cell
                      //   key={`cell-${index}`}
                      //   fill={barColors[index % 20]}
                      // />
                      <Cell
                        fill={
                          moodCount[index].mood === "มีความสุข"
                            ? barColors[0]
                            : moodCount[index].mood === "ประหลาดใจ"
                            ? barColors[1]
                            : moodCount[index].mood === "เครียด"
                            ? barColors[6]
                            : moodCount[index].mood === "รังเกียจ"
                            ? barColors[3]
                            : moodCount[index].mood === "หวาดกลัว"
                            ? barColors[4]
                            : moodCount[index].mood === "เศร้า"
                            ? barColors[5]
                            : moodCount[index].mood === "โกรธ"
                            ? barColors[2]
                            : moodCount[index].mood === "เฉยๆ"
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

            <GraphBox2 style={{ marginTop: 560 }}>
              <GraphBoxname2>
                ความเข้มข้นเฉลี่ยของแต่ละอารมณ์ (ระดับ) <br />
                ในช่วง {diffDay} วัน
              </GraphBoxname2>
              <Grid
                container
                justify="center"
                style={{ marginLeft: -20, marginTop: 80 }}
              >
                <BarChart width={330} height={210} data={moodIntense}>
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis
                    dataKey="mood"
                    textAnchor="end"
                    verticalAnchor="middle"
                    interval={0}
                    angle={-26.4}
                    fontSize={10}
                    fontFamily="Noto Sans,Kanit,sans-serif"
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
                          moodIntense[index].mood === "มีความสุข"
                            ? barColors[0]
                            : moodIntense[index].mood === "ประหลาดใจ"
                            ? barColors[1]
                            : moodIntense[index].mood === "เครียด"
                            ? barColors[6]
                            : moodIntense[index].mood === "รังเกียจ"
                            ? barColors[3]
                            : moodIntense[index].mood === "หวาดกลัว"
                            ? barColors[4]
                            : moodIntense[index].mood === "เศร้า"
                            ? barColors[5]
                            : moodIntense[index].mood === "โกรธ"
                            ? barColors[2]
                            : moodIntense[index].mood === "เฉยๆ"
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

            <GraphBox3 style={{ marginTop: 890 }}>
              <GraphBoxname3>สิ่งที่ขอบคุณ ในช่วง {diffDay} วัน </GraphBoxname3>
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
