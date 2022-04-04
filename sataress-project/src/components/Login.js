import React, { useContext } from "react";
import GoogleButton from "react-google-button";
import { withTheme } from "@material-ui/styles";
import styled from "styled-components";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

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
position:relative;
width: 100%; 
text-align: center;
margin-top:50%;
display:block;
`);


const Login = () => {
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
      <Grid container justifyContent="center"
        alignItems="center" direction="column">
        <Grid item xs={12}>
          <Logo>
            <img src="/image/logo.png" width="320" />
          </Logo>
        </Grid>
        <Grid item xs={12}>
          <GoogleButton onClick={googleLogin} style={{ position: "relative"}}>Sign in with Google</GoogleButton>
        </Grid>
      </Grid>
    </div >
  );
};
export default Login;