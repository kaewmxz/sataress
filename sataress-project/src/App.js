import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Home from './components/Home';
import { AuthProvider } from './components/Auth';
import Calendar from './components/Calendar';
import Moodtrack from './components/Moodtrack';
import Landpage from './components/Landpage';
import Interventions from './components/Interventions';
import Log from './components/Log';
import Boxbreathing from './components/Interventions/Boxbreathing';
import Progressive from './components/Interventions/Progressive';
import Graph from './components/Graph';
import Article from './components/Article'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="*" element={<Login/>}/>
          <Route exact path="/Home" element={<Landpage/>}/>
          <Route exact path="/Calendar" element={<Calendar />} />
          <Route exact path="/Moodtrack" element={<Moodtrack />} />
          <Route exact path="/Interventions" element={<Interventions />} />
          <Route exact path="/Boxbreathing" element={<Boxbreathing />} />\
          <Route exact path="/Progressive" element={<Progressive />} />
          <Route exact path="/Graph" element={<Graph />} />
          <Route exact path="/Article" element={<Article />} />
          <Route exact path="/Log" element={<Log />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}


export default App;