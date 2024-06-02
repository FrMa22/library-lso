import React, { Component } from 'react';

class CardCarrello extends Component {
    handleButtonClick = () => {
        const { id, rimosso_temporaneamente, showRemovePermanentlyButton, handleRestoreToCart, handleRemoveTemporarilyFromCart } = this.props;

        if (rimosso_temporaneamente === 't') {
            handleRestoreToCart(id);
        } else {
            handleRemoveTemporarilyFromCart(id);
        }
    };
    handleRemovePermanently = () => {
        const { id, handleRemovePermanentlyFromCart } = this.props;
        handleRemovePermanentlyFromCart(id);
    };

    render() {
        const { id, nome_libro, nome_autore, copie_totali, durata_prestito, rimosso_temporaneamente,showRemovePermanentlyButton } = this.props;
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
            border: 'none',
            color: '#FFFFFF',
            padding: '0.5rem',
            cursor: 'pointer'
        };

        return (
            <div className="card" style={cardStyle}>
                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ ...textStyle, fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-titolo" style={{ ...textStyle }}>{nome_libro}</h5>
                </div>

                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ ...textStyle, fontSize: '1em' }}>Autore:</h5>
                    <p className="card-autore" style={{ ...textStyle }}>{nome_autore}</p>
                </div>
                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ fontSize: '1em' }}>Numero di copie disponibili:</h5>
                    <p className="card-copie_totali">{copie_totali}</p>
                </div>
                <div style={{ textAlign: 'center', paddingLeft: '5rem', paddingRight: '5rem', width: '20%' }}>
                    <h5 className="card-title" style={{ ...textStyle, fontSize: '1em' }}>Durata Prestito:</h5>
                    <p className="card-durata-prestito" style={{ ...textStyle }}>{durata_prestito}</p>
                </div>

                <div style={{ paddingLeft: '5rem' }}>
                    {rimosso_temporaneamente === 't' && (
                        <button className="btn btn-danger" style={{ ...buttonStyle, marginTop: '0.5rem' }} onClick={this.handleRemovePermanently}>
                        Rimuovi definitivamente
                        </button>
                    )}
                    <button className="btn btn-primary" style={{ ...buttonStyle, marginTop: showRemovePermanentlyButton ? '1rem' : '0' }} onClick={this.handleButtonClick}>
                        {rimosso_temporaneamente === 't' ? 'Riaggiungi al carrello' : 'Rimuovi'}
                    </button>
                </div>
            </div>
        );
    }
}

export default CardCarrello;
