import React, { useContext } from "react";
import GoogleButton from "react-google-button";
import { withTheme } from "@material-ui/styles";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

const Bg = withTheme(styled.div`
  position:fixed ;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 189, 189, 0.3) 0%,
    rgba(254, 68, 10, 0.3) 44.27%
  );
  backdrop-filter: blur(4px);
`);

const Logo = withTheme(styled.div`
  position: relative;
  justify-content:center;
  display:flex;
  
`);

const GButton = withTheme(styled.div`
    position: relative;
`);


const Login = () => {
  const theme = useTheme();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
    signInWithRedirect(auth, provider);
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <Routes>
        <Route path="/" element={<Navigate replace to="/Home" />}></Route>
      </Routes>
    )
  }

  return (
    <div>
      <Bg />
      <Box sx={{ flexGrow: 1, overflow: 'hidden'}}>
        <Paper sx={{ maxWidth: 229, my: 1, mx: "auto", p: 2 }}>
          <Grid container spacing={2}>
            <Grid item>
              <Logo>
                <img src="/image/Logo.png" width="300" />
              </Logo>
            </Grid>
          </Grid>
        </Paper>
        <Paper sx={{ maxWidth: 229, my: 1, mx: "auto", p: 2 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item >
          <GButton>
            <GoogleButton onClick={googleLogin}>Sign in with Google</GoogleButton>
          </GButton>
          </Grid>
        </Grid>
      </Paper>
    </Box>
    </div >
  );
};
export default Login;