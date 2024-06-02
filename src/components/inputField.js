import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            confermaEmail: '',
            password: '',
            confermaPassword: '',
            showPassword: false
        };
    }

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    handleConferma = () => {
        const { email, confermaEmail, password, confermaPassword } = this.state;

        // Verifica se le email e le password corrispondono
        if (email !== confermaEmail) {
            alert('Le email non corrispondono');
            return;
        } else if (password !== confermaPassword) {
            alert('Le password non corrispondono');
            return;
        }
        fetch('http://localhost:8080/registrazioneUtente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password 
            })
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Registrazione Avvenuta con successo');
                localStorage.setItem('userEmail', email);
                window.location.href = '/homeUtente';
            }else if(response.status === 202){
                return response.json();
            } else {
                console.error('Errore nella registrazione');
                return;
            }
        })
        .then(data => {
            if (data) {
                // Verifica se il body contiene libri e stampa ciascuno separatamente 
                if (data.message) {
                    window.alert(data.message);
                }
            }
        })
        .catch(error => {
            console.error('Errore nella chiamata al backend');
        });

    };

    togglePasswordVisibility = () => {
        this.setState((prevState) => ({
            showPassword: !prevState.showPassword
        }));
    };

    render() {
        const { showPassword } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Inserisci email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confermaEmail">Conferma Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="confermaEmail"
                        placeholder="Inserisci conferma email"
                        value={this.state.confermaEmail}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confermaPassword">Conferma Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control"
                        id="confermaPassword"
                        placeholder="Conferma password"
                        value={this.state.confermaPassword}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group d-flex  align-items-center">
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="mostraPassword"
                            checked={showPassword}
                            onChange={this.togglePasswordVisibility}
                        />
                        <label className="form-check-label" htmlFor="mostraPassword">
                            Mostra Password
                        </label>
                    </div>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <button type="button" className="btn btn-secondary mr-2">
                        <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
                            Annulla
                        </Link>
                    </button>
                    <button type="button" className="btn btn-primary" onClick={this.handleConferma}>
                        Conferma
                    </button>
                </div>
            </form>
        );
    }
}

export default InputField;
