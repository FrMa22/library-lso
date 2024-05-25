import React, { Component } from "react";
import { Link } from "react-router-dom";

class LoginForm extends Component {
  render() {
    return (
      <div className='right-section'>
        <div className='welcome-message'>
          <h1>Benvenuto in BookVerse</h1>
        </div>
        <div className='login-form'>
          <form>
            <div className='form-group'>
              <label htmlFor="email">Email</label><br />
              <input type="email" id="email" placeholder="Inserisci la tua email" />
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password</label><br />
              <input type="password" id="password" placeholder="Inserisci la tua password" />
            </div>
            <div className='form-group'>
              <button type="submit">Accedi</button>
            </div>
          </form>
          <p className='register-link'>Non hai un account? <Link to="/registrazione">Registrati</Link></p>
        </div>
      </div>
    );
  }
}

export default LoginForm;
