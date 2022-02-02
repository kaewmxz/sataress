import React from "react";
import { signIn } from "../services/firebase";
import GoogleButton from "react-google-button";
import { withTheme } from "@material-ui/styles";
import styled from "styled-components";
import { useTheme } from "@material-ui/core/styles";
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
  background
`);

const Login = () => {
  const theme = useTheme();
  return (
    <div>
      <Bg>
        <div className="container">
          <div className="logo">
            <center>
              <img src="/image/blogo.png" width="290" height="290" />
            </center>
          </div>
          <div className="GoogleButton">
            <center>
              <GoogleButton onClick={signIn}>Sign in with Google</GoogleButton>
            </center>
          </div>
        </div>
      </Bg >
    </div >
  );
};
export default Login;