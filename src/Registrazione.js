import React, { Component } from 'react';
import InputField from './components/inputField';

class Registrazione extends Component {
    render() {
        return (
            <>
                <div className='container'>
                    <h1>Registrazione</h1>
                    <hr />
                    <div className='row'>
                        <InputField />
                    </div>
                </div>
            </>
        );
    }
}

export default Registrazione;
