import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm from './components/loginForm';
import Registrazione from './Registrazione';
import HomeUtente from './HomeUtente';
import HomeLibraio from './HomeLibraio';
import './App.css';
import HomeLibraio from './HomeLibraio';

class App extends Component {
  state = {
    loggedIn: false, // Stato per tracciare il login
    role: '' // Stato per tracciare il ruolo dell'utente
  };

  handleLogin = async (email, password) => {
    try {
      console.log('Tentativo di accesso al backend...');

      const response = await fetch('http://localhost:8082/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.text();
        console.log('Risposta dal backend:', data);
        if (data.includes("utente")) {
          console.log("Login utente avvenuto con successo");
          localStorage.setItem('userEmail', email); // Salva l'email nel Local Storage
          this.setState({ loggedIn: true, role: 'utente' });
          window.location.href = '/homeUtente'; // Reindirizza a /homeUtente
        } else if (data.includes("libraio")) {
          console.log("Login libraio avvenuto con successo");
          localStorage.setItem('userEmail', email); // Salva l'email nel Local Storage
          this.setState({ loggedIn: true, role: 'libraio' });
          window.location.href = '/homeLibraio';

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
          <Route path="/homeLibraio" element={<HomeLibraio />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
