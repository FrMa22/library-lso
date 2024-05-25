import React, { Component } from 'react';
import logo from '../logo.svg';

class InputField extends Component {
    render() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email </label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Inserisci email" 
                    />
                    <small 
                        id="emailHelp" 
                        className="form-text text-muted">
                    </small>
                </div>
                


                <div className="form-group">
                    <label htmlFor="confermaEmail">Conferma Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="confermaEmail" 
                        aria-describedby="emailHelp" 
                        placeholder="Inserisci conferma email" 
                    />
                    <small 
                        id="emailHelp" 
                        className="form-text text-muted">
                    </small>
                </div>



                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="confermaPassword">Conferma Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="confermaPassword" 
                        placeholder="Conferma password" 
                    />
                </div>




                <button type="submit" className="btn btn-primary">Conferma</button>
            </form>
        );
    }
}

export default InputField;
