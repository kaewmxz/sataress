import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import { AuthProvider } from './components/Auth';
import Calendarcard from './components/calendar/Calendar';
import Moodtrack from './components/Moodtrack';
import DASS21 from  './components/DASS-21';
import Landpage from './components/Landpage';
import Interventions from './components/Interventions';
import Log from './components/Log';
import Boxbreathing from './components/Interventions/Boxbreathing';
import Progressive from './components/Interventions/Progressive';
import Graph from './components/Graph';
import Article from './components/Article'
import CalendarLogs from './components/calendar/CalendarLogs'

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="*" element={<Login/>}/>
          <Route exact path="/Home" element={<Landpage/>}/>
          <Route exact path="/Calendar" element={<Calendarcard />} />
          <Route exact path="/Moodtrack" element={<Moodtrack />} />
          <Route exact path="/DASS21" element={<DASS21 />} />
          <Route exact path="/Interventions" element={<Interventions />} />
          <Route exact path="/Boxbreathing" element={<Boxbreathing />} />\
          <Route exact path="/Progressive" element={<Progressive />} />
          <Route exact path="/Graph" element={<Graph />} />
          <Route exact path="/Article" element={<Article />} />
          <Route exact path="/Log" element={<Log />} />
          <Route exact path="/CalendarLogs" element={<CalendarLogs />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}


export default App;