import React, { Component } from "react";
import LibreriaImmagine from '../images/libreria_immagine.jpg';
import { Link } from "react-router-dom";
import InputField from './inputField.js';
import '../loginForm.css'; // Importa il file CSS per le classi aggiuntive

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isSwapped: false
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.onLogin(email, password);
  };
  handleEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  handleSwap = () => {
    console.log('cliccato scambia');
    this.setState(prevState => ({
      isSwapped: !prevState.isSwapped
    }));
  };

  render() {
    const { isSwapped } = this.state;

    return (
      <div className={`loginFormClass ${isSwapped ? 'swapped' : ''}`}>
        <div className='left-section'>
          <img src={LibreriaImmagine} alt="Descrizione dell'immagine" />
        </div>
        <div className='right-section'>
          {isSwapped ? (
              <InputField handleSwap={this.handleSwap}/> ) : (
                <div className="formDiLogin"> 
                  <div className='welcome-message' style={{marginBottom:'50px'}}>
                    <h1 style={{fontSize: '60px'}}>Benvenuto in BookVerse</h1>
                </div>

                  <div className='login-form' style={{fontSize:'20px'}}>
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
                      <div className='form-group' style={{marginTop:'20px'}}>
                        <button type="submit" style={{ backgroundColor: 'blue', borderRadius: '10px', padding: '5px',color:'white',fontSize:'20px',paddingLeft:'100px',paddingRight:'100px'}}>Accedi</button>
                      </div>
                    </form>
                    <p className='register-button' style={{marginTop:'50px',fontSize:'20px'}}>Non hai un account? <button onClick={this.handleSwap} style={{color:'blue'}} ><strong> Registrati</strong></button></p>
                  </div>
                </div>
                )}
          
        </div>
      </div>
    );
  }
}

export default LoginForm;
