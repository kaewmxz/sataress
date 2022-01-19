import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Calendar from "./components/Calendar";
import Moodtrack from "./components/Moodtrack";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Calendar" element={<Calendar />} /> 
      <Route path="Moodtrack" element={<Moodtrack />} /> 
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
