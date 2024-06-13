import React, { Component } from 'react';

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
        const {handleSwap} = this.props;

        return (
            <form onSubmit={this.handleSubmit} style={{width:'75%'}}>
            <p style={{justifyContent:'center', display:'flex', fontSize:'35px'}}> <strong>Registrazione </strong> </p>
                <div className="form-group" style={{marginTop:'20px'}}>
                    <label htmlFor="email" >Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Inserisci email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group" style={{marginTop:'20px'}}>
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

                <div className="form-group" style={{marginTop:'20px'}}>
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

                <div className="form-group" style={{marginTop:'20px'}}>
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

                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'flex-end' }}>
                    <div className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="mostraPassword"
                            checked={showPassword}
                            onChange={this.togglePasswordVisibility}
                        />
                        <label className="form-check-label" htmlFor="mostraPassword" style={{marginLeft:'10px'}}>
                            Mostra Password
                        </label>
                    </div>
                </div>


                <div className="form-group" style={{justifyContent:'space-between',paddingLeft:'20px', paddingRight:'20px',display:'flex',marginTop:'40px'}}>
                    <button type="button" style={{ backgroundColor:'red', padding:'10px',paddingLeft:'50px',paddingRight:'50px',borderRadius:'10px' ,color: 'white',fontSize:'20px' }}  onClick={handleSwap} >
                        Annulla
                    </button>
                    <button type="button" style={{ backgroundColor:'blue', padding:'10px' ,paddingLeft:'50px',paddingRight:'50px',borderRadius:'10px' ,color: 'white' ,fontSize:'20px'}} onClick={this.handleConferma}>
                        Crea Account
                    </button>
                </div>
            </form>
        );
    }
}

export default InputField;
