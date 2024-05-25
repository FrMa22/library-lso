import React, { Component } from 'react';
import LibreriaImmagine from './images/libreria_immagine.jpg';
import LoginForm from './components/loginForm';
import './App.css'; // Importa il file CSS per lo stile

class App extends Component {
  render() {
    return (
          <div className='main-box'>
            <div className='left-section'>
              <img src={LibreriaImmagine} alt="Descrizione dell'immagine" />
            </div>
            <LoginForm/>            
          </div>
    );
  }  
}

export default App;
