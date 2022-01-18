import React from "react";
import { signIn } from "../services/firebase";
import GoogleButton from "react-google-button";
import { useTheme } from "@material-ui/core/styles";
import styled from "styled-components";
import { withTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core"
//import ResponsiveImgMaterialUi from "responsive-img-material-ui";
import "../css/login.css";

const Bg = withTheme(styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 189, 189, 0.3) 0%,
    rgba(254, 68, 10, 0.3) 44.27%
  );
  backdrop-filter: blur(4px);
`);

const Image = withTheme(styled.div`
  ${(props) => props.theme.breakpoints.width("sm")} {
    width: 10px;
    height: 10px;
  }
  ${(props) => props.theme.breakpoints.width("md")} {
    width: 100px;
    height: 100px;
  }
  ${(props) => props.theme.breakpoints.width("lg")} {
    width: 500px;
    height: 500px;
  }
  `);

const Login = () => {
  const theme = useTheme();
  return (
    <Bg>
      <Grid container justify = "center">
      {/* <ResponsiveImgMaterialUi 
      xs="/image/gmail_logo.png">
        </ResponsiveImgMaterialUi> */}
        <Image>
          <img
            src="/image/gmail_logo.png"
            alt=""
          />
        </Image>
        </Grid>
      <div className="GoogleButton">
        <GoogleButton onClick={signIn}>Sign in with Google</GoogleButton>
      </div>
    </Bg>
  );
};
export default Login;
