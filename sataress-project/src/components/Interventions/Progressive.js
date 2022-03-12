import React, { useState, useContext } from "react";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from '@material-ui/core';
import { Routes, Route, Navigate} from 'react-router-dom';
import BottomNavigationBar from "../BottomNavigationBar ";
import Head from "../Head";
import { AuthContext } from "../Auth";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

const Btn = withTheme(styled.div`
text-align:center;
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
                <Image style={{ marginTop: 130 }}>
                    <img src="/image/Prog.png" width="311px" height="228px" />
                </Image>
                <Card sx={{ maxWidth: 500, marginTop: 45,marginBottom:5 }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                            Progressive muscle relaxation
                        </Typography>
                        <Typography variant="h6" color="text.secondary" fontFamily='Roboto Slab, serif, Noto Sans Thai'>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.
                            Donec ut maximus sem.
                            Vivamus condimentum tort
                            or non neque condimentum,
                            sed dictum purus hendrerit.
                            Donec a nunc pulvinar, porta
                            neque a, .
                        </Typography>
                        <br/>
                        <Btn>
                            <button style={{ fontSize: 18, color: "#FE440A" , fontFamily:'Roboto Slab, serif, Noto Sans Thai', border: "none", background:"none"}}>Play</button>
                        </Btn>
                        <br/>
                        <br/>
                    </CardContent>
                </Card>
            </Grid>
            <BottomNavigationBar />
        </div>
    );
};
export default Progressive;

