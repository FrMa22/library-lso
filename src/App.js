import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LibreriaImmagine from './images/libreria_immagine.jpg';
import LoginForm from './components/loginForm';
import Registrazione from './Registrazione'; // Import corretto per Registrazione.js
import './App.css'; // Importa il file CSS per lo stile

class App extends Component {
  render() {
    return (
      <Router>
        <div className='main-box'>
          <div className='left-section'>
            <img src={LibreriaImmagine} alt="Descrizione dell'immagine" />
          </div>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/registrazione" element={<Registrazione />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

export default App;


