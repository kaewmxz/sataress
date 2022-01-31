import React, { useContext } from "react";
//import { signIn } from "../services/firebase";
import GoogleButton from "react-google-button";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from "./Auth";
import { getAuth, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";
//import ResponsiveImgMaterialUi from "responsive-img-material-ui";
import "../css/login.css";

const Bg = withTheme(styled.div`
  position: absolute;
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
    signInWithRedirect(auth,provider).then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user)
    }).catch((error) => {
      console.log(error.message)
    });
  }

  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return (
      <Routes>
        <Route path ="/" element={<Navigate replace to ="/home"/>}></Route>
      </Routes>
    )
  }

  return (
    <Bg>
      <Grid container justify="center">
      
          <br />
          <img src="/image/blogo.png"  />
 
      </Grid>
      <div className="GoogleButton">
        <center>
        <GoogleButton onClick={googleLogin}>Sign in with Google</GoogleButton>
        </center>
      </div>
    </Bg>
  );
};
export default Login;
