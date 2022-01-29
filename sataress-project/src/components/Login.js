import React from "react";
import { signIn } from "../services/firebase";
import GoogleButton from "react-google-button";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
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
  return (
    <Bg>
      <Grid container justify="center">
      
          <br />
          <img src="/image/blogo.png"  />
 
      </Grid>
      <div className="GoogleButton">
        <center>
        <GoogleButton onClick={signIn}>Sign in with Google</GoogleButton>
        </center>
      </div>
    </Bg>
  );
};
export default Login;
