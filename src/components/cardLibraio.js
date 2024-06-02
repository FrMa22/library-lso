import React, { Component } from 'react';
import immagineInformazioni from '../images/info.jpg';
import InfoPopup from './infoPopup';

class CardLibraio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            prestiti : [],//memorizza i prestiti prelevati poi dal server c
        };
    }

    // togglePopup = () => {
    //     this.setState((prevState) => ({
    //         showPopup: !prevState.showPopup,
    //     }));
    // };

    togglePopup = () => {
        this.setState((prevState) => ({
            showPopup: !prevState.showPopup,
        }), () => {
            if (this.state.showPopup) {
                this.loadPrestiti(); // Carica i prestiti quando il popup viene aperto
            }
        });
    };
    



    loadPrestiti = () => {
        const { nome_libro } = this.props;
        // Effettua la chiamata al backend per ottenere i dati dei prestiti per il libro corrente
        console.log("recupero dati dal server");
        fetch(`http://localhost:8090/info?titolo=${encodeURIComponent(nome_libro)}`)
            .then(response => response.json())
            .then(data => {
                console.log("dati recuperati");
                this.setState({ prestiti: data.prestiti, loadingPrestiti: false });
            })
            .catch(error => {
                console.error('Errore durante il recupero dei prestiti:', error);
                this.setState({ loadingPrestiti: false });
            });
    };




    render() {

        const { nome_libro, nome_autore, copie_totali, copie_prestito } = this.props;
        const { prestiti} = this.state;


        return (
            <div className="card" style={{ width: '30%', height:'30%', margin: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                <div style={{ textAlign: 'center' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-title">{nome_libro}</h5>
                </div>
                
                <div style={{ width: '100%', textAlign: 'center', marginTop: '0.5rem' }}>
                    <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Autore:</h5>
                    <p className="card-author">{nome_autore}</p>
                </div>
                
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div style={{ flex: '1', textAlign: 'left', marginTop: '0.5rem' }}>
                        <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Numero di copie disponibili:</h5>
                        <p className="card-copie-disponibili">{copie_totali}</p>
                    </div>
                    
                    <div style={{ flex: '1', textAlign: 'center', marginTop: '0.5rem' }}>
                        <h5 className="card-title" style={{ color: '#888888', fontSize: '1em' }}>Numero di copie prese in prestito:</h5>
                        <p className="card-durata-prestito">{copie_prestito}</p>
                    </div>
                    <div style={{ flex: '1', textAlign: 'right', marginTop: '0.5rem' }}>
                        <button className="btn btn-primary" onClick={this.togglePopup} style={{ background: 'none', border: 'none', padding: 0 }}>
                            <img src={immagineInformazioni} alt="Mostra informazioni" style={{ width: '48px', height: '48px' }} />
                        </button>
                    </div>
                </div>

                <InfoPopup show={this.state.showPopup} onClose={this.togglePopup} prestiti={prestiti} nome_libro={nome_libro}  />
            </div>
        );
    }
}

export default CardLibraio;
