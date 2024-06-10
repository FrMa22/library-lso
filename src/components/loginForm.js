import React, { Component } from "react";
import LibreriaImmagine from '../images/libreria_immagine.jpg';
import { Link } from "react-router-dom";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onLogin(email, password);
  };

  render() {
  return (
    <div className='loginFormClass' style={{ display: 'flex', flexDirection: 'row'}}>
      <div className='left-section' style={{width:'50%', height:'80%'}}>
        <img src={LibreriaImmagine} alt="Descrizione dell'immagine" />
      </div>
      <div className='right-section' style={{width:'50%'}}>
        <div className='welcome-message'>
          <h1>Benvenuto in BookVerse</h1>
        </div>
        <div className='login-form'>
          <form onSubmit={this.handleSubmit}>
            <div className='form-group'>
              <label htmlFor="email">Email</label><br />
              <input
                type="email"
                id="email"
                placeholder="Inserisci la tua email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className='form-group'>
              <label htmlFor="password">Password</label><br />
              <input
                type="password"
                id="password"
                placeholder="Inserisci la tua password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className='form-group'>
              <button type="submit" style={{backgroundColor:'#6FC1FF', borderRadius:'20px', padding:'10px'}}>Accedi</button>
            </div>
          </form>
          <p className='register-link'>Non hai un account? <Link to="/registrazione">Registrati</Link></p>
        </div>
      </div>
    </div>
  );
}

}

export default LoginForm;
