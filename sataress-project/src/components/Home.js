import React, { useState } from "react";
import { auth } from "../services/firebase";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const Home = ({ user }) => {
  var name = user.displayName;
  var uid = user.uid;
  // These two const used for the weekly/monthly togglebuttons
  const [alignment, setAlignment] = React.useState("web");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <div className="home">
      <h1>
        Hello, <span></span>
        {name}
      </h1>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <center>
        {/* Calendar card */}
        <img src="/image/calendar.png" />
        <br />
        <br />
        {/* Gratitude journal button */}
        <button /*onClick={}*/>Gratitude journal</button>
        <br />
        <br />
        {/* Monthly or Weekly button */}
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="weekly">Weekly</ToggleButton>
          <ToggleButton value="monthly">Monthly</ToggleButton>
        </ToggleButtonGroup>
      </center>
    </div>
  );
};

export default Home;
