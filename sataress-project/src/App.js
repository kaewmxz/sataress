import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './components/Auth';
import Calendar from './components/Calendar';
import Moodtrack from './components/Moodtrack';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="*" element={<Login/>}/>
          <Route exact path="/home" element={<Home/>}/>
          <Route path="Calendar" element={<Calendar />} />
          <Route path="Moodtrack" element={<Moodtrack />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}


export default App;