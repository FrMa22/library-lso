// LimitePopup.js
import React, { Component } from 'react';
import '../limitePopup.css'; // Assicurati di avere lo stile CSS per il popup

class LimitePopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            limite: '', // Stato per memorizzare il valore del limite
        };
    }

    handleChange = (e) => {
        this.setState({ limite: e.target.value });
    };

    handleConferma = () => {
        const { limite } = this.state;
        this.props.onConferma(limite); // Chiamare la funzione onConferma passando il limite
    };

    render() {
        const { isOpen, onClose } = this.props;
        const { limite } = this.state;

        return (
            isOpen && (
                <div className="limite-popup">
                    <div className="limite-popup-content">
                        <span className="close" onClick={onClose}>&times;</span>
                        <div style={{fontSize:'35px', justifyContent:'center', display:'flex', marginBottom:'20px'}}> 
                            <strong>Inserisci il limite</strong>
                        </div>
                        
                        <input
                            type="number"
                            value={limite}
                            onChange={this.handleChange}
                            placeholder="Inserisci il limite"
                        />
                        <div className="buttons">
                            <button className='annulla_button' onClick={onClose}>Annulla</button>
                            <button className='conferma_button' onClick={this.handleConferma}>Conferma</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default LimitePopup;

