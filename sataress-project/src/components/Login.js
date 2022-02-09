import React, { useContext } from "react";
import GoogleButton from "react-google-button";
import { withTheme } from "@material-ui/styles";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
//import ResponsiveImgMaterialUi from "responsive-img-material-ui";
import "../css/login.css";

const Bg = withTheme(styled.div`
  position: absolute;
  boarder: none;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 189, 189, 0.3) 0%,
    rgba(254, 68, 10, 0.3) 44.27%
  );
  backdrop-filter: blur(4px);
`);

const Login = () => {
  const theme = useTheme();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const googleLogin = () => {
     signInWithRedirect(auth,provider);
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <Routes>
        <Route path ="/" element={<Navigate replace to ="/Home"/>}></Route>
      </Routes>
    )
  }

  return (
      <Bg>
        <div className="container">
          <div className="logo">
            <center>
              <img src="/image/blogo.png" width="290" height="290" />
            </center>
          </div>
          <div className="GoogleButton">
            <center>
              <GoogleButton onClick={googleLogin}>Sign in with Google</GoogleButton>
            </center>
          </div>
        </div>
      </Bg >
  );
};
export default Login;