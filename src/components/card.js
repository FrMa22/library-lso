import React, { Component } from 'react';

class Card extends Component {
    handleAddToCart = () => {
        const { presente_nel_carrello, nome_libro, onAddToCart } = this.props;
        if (presente_nel_carrello == 't') {
            console.log('Questo libro è già nel carrello!');
            window.alert("Questo libro è già nel carrello!");
        } else {
            console.log('Questo libro non è nel carrello!');
            onAddToCart(nome_libro);
        }
    };

    render() {
        const { nome_libro, nome_autore, copie_totali, durata_prestito, presente_nel_carrello } = this.props;
        console.log("valore di presente nel carrello: ",presente_nel_carrello);
        if(presente_nel_carrello === 't'){
            console.log("entrato");
        }
        return (
            <div className="card" style={{ width: '30%', height: '30%', margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-titolo">{nome_libro}</h5>
                </div>
                
                <div style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Autore:</h5>
                    <p className="card-autore">{nome_autore}</p>
                </div>
                
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                    <div style={{ textAlign: 'left' }}>
                        <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Numero di copie disponibili:</h5>
                        <p className="card-copie_totali">{copie_totali}</p>
                    </div>
                    
                    <div style={{ textAlign: 'right' }}>
                        <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Durata Prestito:</h5>
                        <p className="card-durata_prestito">{durata_prestito} giorni</p>
                    </div>
                </div>

                <div style={{ marginTop: '1rem', width: '100%', textAlign: 'center' }}>
                    <button 
                        className="btn btn-primary" 
                        style={{ 
                            background: presente_nel_carrello === 't' ? '#ccc' : 'blue', 
                            color: '#fff', 
                            border: 'none', 
                            padding: '0.5rem 1rem', 
                            borderRadius: '4px', 
                            cursor: presente_nel_carrello === 't' ? 'not-allowed' : 'pointer' 
                        }} 
                        onClick={this.handleAddToCart}
                    >
                        Aggiungi al carrello
                    </button>
                </div>
            </div>
        );
    }
}

export default Card;
