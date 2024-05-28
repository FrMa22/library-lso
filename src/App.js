import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Registrazione from './Registrazione';
import HomeUtente from './HomeUtente';
import './App.css';

class App extends Component {
  state = {
    loggedIn: false // Stato per tracciare il login
  };

  handleLogin = async (email, password) => {
    try {
      console.log('Tentativo di accesso al backend...');

      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Risposta dal backend:', data);
        if (data.includes("utente trovato")) {
          console.log("Login avvenuto con successo");
          this.setState({ loggedIn: true });
          window.location.href = '/homeUtente'; // Reindirizza a /home con un cambio di pagina
        } else {
          console.log("Credenziali non valide");
        }
      } else {
        console.error('Errore nella richiesta al backend:', response.statusText);
      }
    } catch (error) {
      console.error('Errore nella richiesta al backend:', error.message);
    }
  };
  render() {
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <LoginForm
                loggedIn={this.state.loggedIn}
                onLogin={this.handleLogin}
              />
            }
          />
          <Route path="/registrazione" element={<Registrazione />} />
          <Route path="/homeUtente" element={<HomeUtente />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
