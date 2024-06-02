import React, { Component } from 'react';

class CardInPrestito extends Component {
    render() {
        const { nome_libro, dataRestituzione, dataPrestito, handleReturnBook } = this.props;
        const isEven = Math.random() > 0.5; // Assuming id is not available, using random for styling

        const cardStyle = {
            width: '90%',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            margin: '0.5rem',
            border: '1px solid #ddd',
            padding: '0.1rem',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
        };
        const textStyle = {
            
        };
        const buttonStyle = {
            backgroundColor: '#FF0000',
            border: 'none',
            color: '#FFFFFF',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
        };

        return (
            <div className="card" style={cardStyle}>
                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ ...textStyle, fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-titolo" style={{ ...textStyle }}>{nome_libro}</h5>
                </div>

                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ ...textStyle, fontSize: '1em' }}>Data prestito:</h5>
                    <p className="card-data-prestito" style={{ ...textStyle }}>{dataPrestito}</p>
                </div>
                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ fontSize: '1em' }}>Scadenza prestito:</h5>
                    <p className="card-scadenza-prestito">{dataRestituzione}</p>
                </div>
              

                <div style={{ paddingLeft: '5rem' }}>
                    <button className="btn btn-primary" style={buttonStyle} onClick={handleReturnBook}>
                        Restituisci
                    </button>
                </div>
            </div>
        );
    }
}

export default CardInPrestito;
