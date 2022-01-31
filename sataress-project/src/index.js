import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import App from "./App";
import Calendar from "./components/Calendar";
import Moodtrack from "./components/Moodtrack";
import Home from "./components/Home"
import Login from "./components/Login"
import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={<App />} />
//       <Route path="Calendar" element={<Calendar />} />
//       <Route path="Moodtrack" element={<Moodtrack />} />
//       <Route path="/home" element={Home} />
//       <Route path="/login" element={Login} />
//     </Routes>
//   </BrowserRouter>,
//   document.getElementById("root")
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
