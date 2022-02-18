import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid, Container } from '@material-ui/core';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';

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

const Image = withTheme(styled.div`
position: absolute;
width: 320.7px;
height: 182px;
filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
`);


const Progressive = () => {
    const { currentUser } = useContext(AuthContext);
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
            <Head />
            <Grid container justify="center">
                <Image style={{ marginTop: 205 }}>
                    <img src="/image/progressive.png" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 60,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Progressive muscle relaxation
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Donec ut maximus sem.
                            Vivamus condimentum tort
                            or non neque condimentum,
                            sed dictum purus hendrerit.
                            Donec a nunc pulvinar, porta
                            neque a, .
                        </Typography>
                        <br />
                        <Stack>
                            <Button
                                style={{ fontSize: 18, color: "#FE440A" }} endIcon={<SlideshowOutlinedIcon />}>Play</Button>
                        </Stack>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar />
        </div>
    );
};
export default Progressive;

