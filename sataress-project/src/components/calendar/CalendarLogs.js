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
  const {mood, intensity, thoughts, activity, date} = props;
  return (
    <Grid container justify="center" >
      <Card sx={{ width: 300, m: 1 }} style={{backgroundColor: "#FFFF", borderStyle:"double",borderColor:"#91E59A"}}>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
            {date}
          </Typography>
          <Typography variant="body2" color="text.primary"  fontFamily='Roboto Slab, serif, Noto Sans Thai'>
          Activity:{activity}
          </Typography>
          <Typography variant="body2" color="text.primary"  fontFamily='Roboto Slab, serif, Noto Sans Thai'>
          Mood:{mood+""}
          </Typography>
          <Typography variant="body2" color="text.primary"  fontFamily='Roboto Slab, serif, Noto Sans Thai'>
          Intensity:{intensity+""}
          </Typography>
          <Typography variant="body2" color="text.primary"  fontFamily='Roboto Slab, serif, Noto Sans Thai'>
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
      for (let j = 0; j < data[i].mood.length; j++) {
        if (data[i].mood[j] == "Happy") {
          data[i].mood[j] = "Happy😊"
        }
        else if (data[i].mood[j] == "Sad") {
          data[i].mood[j] = "Sad😭"
        }
        else if (data[i].mood[j] == "Stressed") {
          data[i].mood[j] = "Stressed😣";
        }
        else if (data[i].mood[j] == "Surprised") {
          data[i].mood[j] = "Surprised😯";
        }
        else if (data[i].mood[j] == "Fearful") {
          data[i].mood[j] = "Fearful😰";
        }
        else if (data[i].mood[j] == "Disgusted") {
          data[i].mood[j] = "Disgusted🤢";
        }
        else if (data[i].mood[j] == "Neutral") {
          data[i].mood[j] = "Neutral😶";
        }
        else if (data[i].mood[j] == "Angry") {
          data[i].mood[j] = "Angry😡";
        }
      }
      rows.push(
        createData(
          data[i].date,
          data[i].activity,
          data[i].mood,
          data[i].intensity,
          data[i].thoughts
        )
      );
    }
  } catch (err) {
    // console.log(err);
  }
  return (
    <div>
      <Bg />
      <Head />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      {data.map((data, id) => (
        <MoodInfo key={id} {...data} />
      ))}
      <br />
      <br />
      <br />
      <br />
      <br />
      <BottomNavigationBar />
    </div>
  );
};
export default Log;