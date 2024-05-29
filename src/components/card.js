import { Component } from 'react';
import immagineCarrelloAggiungi from '../images/add-to-cart.png';
class Card extends Component {
    render() {
        return (
            <div className="card" style={{ width: '30%', height:'30%', margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{  textAlign: 'center' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-title">{this.props.nome_libro}</h5>
                </div>
                
                <div style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Autore:</h5>
                    <p className="card-author">{this.props.nome_autore}</p>
                </div>
                
                <div style={{flexDirection:'row', display:'flex'}}>
                    <div style={{ flex:'1', textAlign: 'left', marginTop: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Numero di copie disponibili:</h5>
                    <p className="card-copie-disponibili">{this.props.copie_disponibili}</p>
                </div>
                
                <div style={{ flex:'1', textAlign: 'center', marginTop: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Durata Prestito:</h5>
                    <p className="card-durata-prestito">{this.props.durata_prestito}</p>
                </div>
                <div style={{ flex:'1', textAlign: 'right', marginTop: '0.5rem' }}>
                <button className="btn btn-primary" style={{ background: 'none', border: 'none', padding: 0 }}>
                            <img src={immagineCarrelloAggiungi} alt="Aggiungi al carrello" style={{ width: '48px', height: '48px' }} />
                        </button>
                </div>
                </div>
                
                
                
            </div>
        );
    }
}

export default Card;
