import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Typography from "@mui/material/Typography";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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


const MoodInfo = (props) => {
  const {mood, intensity, thoughts, activity, dateToCheck} = props;
  let emoji = "";
  if (mood == "happy") {
    emoji = "a";
  }
  return (
    <Grid container>
      <Card sx={{width: 200, marginTop:20}}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {dateToCheck}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Activity:{activity}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Mood:{mood+""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Intensity:{intensity+""}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Thoghts:{thoughts}
          </Typography>
        </CardContent>
      </Card>
      </Grid>
  )
}

const Log = () => {
  const { currentUser } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const location = useLocation();

  function createData(date, activity, moods, intensities, thought) {
    return {
      date,
      activity,
      moods,
      intensities,
      thought,
    };
  }

  useEffect(() => {
    if (currentUser) {
      const fetchLogs = async () => {
        try {
          const result = await axios.get("http://localhost:4000/mood-logs", {
            params: { id: currentUser.uid, date: location.state.date },
          });
          setData(result.data.message);
        } catch (err) {
          console.log(err);
        }
      };
      fetchLogs();
    }
  }, []);

  if (!currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/" />}></Route>
      </Routes>
    );
  }

  let rows = [];
  try {
    for (let i = 0; i < data.length; i++) {
      rows.push(
        createData(
          data[i].date,
          data[i].activity,
          data[i].mood.toString(),
          data[i].intensity.toString(),
          data[i].thoughts
        )
      );
    }
    console.log(rows);
  } catch (err) {
    // console.log(err);
  }
  return (
    <div>
      <Bg />
      <Head />
      {data.map((data,id) => (
        <MoodInfo key={id} {...data}/>
      ))}
      <BottomNavigationBar />
    </div>
  );
};
export default Log;