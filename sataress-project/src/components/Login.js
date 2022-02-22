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
`);

const Text = withTheme(styled.div`
position: relative;
width: 240px;
bottom:40px;
left: 5px;
font-family: Roboto Mono;
font-style: bold;
font-weight: 500;
font-size: 18px;
text-align: right;
color: #FFFFFF;
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
      <Box sx = {{width:370, height:600,mx:"auto", paddingY:"auto"}}>
        <Grid container justifyContent="center">
            <Logo>
              <img src="/image/Logo.png" width="320" />
            </Logo>
            <Text>“Your illness is not your identity.
              Your chemistry is not your character.”
               — Rick Warren</Text>
            <GButton>
              <GoogleButton onClick={googleLogin}>Sign in with Google</GoogleButton>
            </GButton>
            </Grid>
      </Box>
    </div >
  );
};
export default Login;