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
    font-family: Roboto;
    font-style: normal;
    font-weight: bold;
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

  // const Fire = withTheme(styled.div`
  //   position: absolute;
  //   width: 23px;
  //   height: 30px;
  //   top: 75px;
  //   ${(props) => props.theme.breakpoints.up("xs")} {
  //     right: 110px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("sm")} {
  //     right: 138px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("md")} {
  //     right: 180px;
  //     margin-top: 5px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("lg")} {
  //     right: 230px;
  //     margin-top: 10px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("xl")} {
  //     right: 265px;
  //     margin-top: 20px;
  //   }
  // `);

  // const Streak = withTheme(styled.div`
  //   position: absolute;
  //   top: 85px;
  //   font-family: Roboto;
  //   font-style: normal;
  //   font-weight: bold;
  //   line-height: 12px;
  //   text-align: center;
  //   ${(props) => props.theme.breakpoints.up("xs")} {
  //     right: 40px;
  //     font-size: 10px;
  //     width: 68.94px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("sm")} {
  //     font-size: 10px;
  //     width: 90px;
  //     right: 55px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("md")} {
  //     font-size: 14px;
  //     margin-top: 5px;
  //     width: 135px;
  //     right: 60px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("lg")} {
  //     font-size: 16px;
  //     margin-top: 10px;
  //     width: 137px;
  //     right: 105px;
  //   }
  //   ${(props) => props.theme.breakpoints.up("xl")} {
  //     font-size: 20px;
  //     margin-top: 20px;
  //     width: 188px;
  //     right: 100px;
  //   }
  // `);

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
      {/* <Fire>
        <img src="/image/fire.png" width="23px"></img>
      </Fire>
      <Streak>Current Streak</Streak> */}
      <Logout>
        <PopupSignout></PopupSignout>
      </Logout>
    </div>
  );
}
