import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Calendar from "./components/Calendar";
ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Calendar" element={<Calendar />} /> 
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
