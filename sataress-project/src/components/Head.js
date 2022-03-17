import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import { withTheme } from "@material-ui/core/styles";
import PopupSignout from "./popup/PopupSignout";
import { AuthContext } from "./Auth";
import "../css/home.css";

const Head = withTheme(styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
  `);

  const Profile = withTheme(styled.div`
    position: absolute;
    left: 33px;
    top: 36px;
  `);

  const Name = withTheme(styled.div`
    position: absolute;
    font-family: 'Source Serif Pro, serif, Noto Sans Thai';
    font-style: normal;
    top: 60px;
    ${(props) => props.theme.breakpoints.up("xs")} {
      font-size: 18px;
      right: 45px;
    }
    ${(props) => props.theme.breakpoints.up("sm")} {
      font-size: 20px;
      right: 70px;
    }
    ${(props) => props.theme.breakpoints.up("md")} {
      font-size: 24px;
      right: 90px;
    }
    ${(props) => props.theme.breakpoints.up("lg")} {
      font-size: 26px;
      right: 100px;
    }
    ${(props) => props.theme.breakpoints.up("xl")} {
      font-size: 30px;
      right: 130px;
    }
  `);

  const Logout = withTheme(styled.div`
    position: absolute;
    top: 58px;
    ${(props) => props.theme.breakpoints.up("xs")} {
      right: 10px;
    }
    ${(props) => props.theme.breakpoints.up("sm")} {
      right: 40px;
    }
    ${(props) => props.theme.breakpoints.up("md")} {
      margin-top: 3px;
      right: 50px;
    }
    ${(props) => props.theme.breakpoints.up("lg")} {
      margin-top: 4px;
      right: 60px;
    }
    ${(props) => props.theme.breakpoints.up("xl")} {
      margin-top: 8px;
      right: 80px;
    }
  `);

export default function Header() {
  const { currentUser } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const username = currentUser.displayName;
  const str = username.split(" ", 2);
  const nickname = str[0];
  useEffect(() => {
    if (currentUser) {
      setName(nickname);
      setImage(currentUser.photoURL);
    }
  }, []);

  return (
    <div>
      <Head>
        <img src="/image/head.png" width="300px"></img>
        <Profile>
          <Avatar alt="" src={image} sx={{ width: 67, height: 67 }}></Avatar>
        </Profile>
      </Head>
      <Name>Hi, {name}</Name>
      <Logout>
        <PopupSignout></PopupSignout>
      </Logout>
    </div>
  );
}
