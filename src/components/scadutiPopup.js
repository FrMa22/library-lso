// ScadutiPopup.js

import React, { Component } from 'react';
import '../scadutiPopup.css';
import UtenteScaduto from './utenteScaduto';

class ScadutiPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prestiti: [],
            loadingPrestiti: false, // Stato per tracciare il caricamento
        };
    }

    componentDidUpdate(prevProps) {
        // Controlla se il popup è stato aperto e se prima era chiuso
        if (!prevProps.isOpen && this.props.isOpen) {
            this.loadPrestiti();
        }
    }

    handleAvvisa = (email) => {
        console.log(`Avviso inviato a: ${email}`);
        // Implementa la logica per inviare l'avviso
    };

    loadPrestiti = () => {
        // Imposta lo stato di caricamento
        this.setState({ loadingPrestiti: true });

        // Effettua la chiamata al backend per ottenere i dati dei prestiti scaduti
        console.log("recupero dati dal server");
        fetch('http://localhost:8090/scaduti')
            .then(response => response.json())
            .then(data => {
                console.log("dati recuperati");
                this.setState({ prestiti: data.scaduti, loadingPrestiti: false });
            })
            .catch(error => {
                console.error('Errore durante il recupero dei prestiti:', error);
                this.setState({ loadingPrestiti: false });
            });
    };

    render() {
        const { prestiti, loadingPrestiti } = this.state;
        const { isOpen, onClose } = this.props;

        return (
            isOpen && (
                <div className="search-popup-container">
                    <div className="search-popup">
                        <h2>Utenti con prestiti scaduti</h2>
                        {loadingPrestiti ? (
                            <p>Caricamento...</p>
                        ) : (
                            <div className="prestiti-scaduti-list">
                                {prestiti.map((prestito) => (
                                    <UtenteScaduto
                                        key={prestito.email}
                                        email={prestito.email}
                                        nomeLibro={prestito.titolo}
                                        dataPrestito={prestito.data_prestito}
                                        dataFinePrestito={prestito.data_restituzione}
                                        onAvvisa={() => this.handleAvvisa(prestito.email)}
                                    />
                                ))}
                            </div>
                        )}
                        <div className="button-container">
                            <button className="close-button" onClick={onClose}>Chiudi</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default ScadutiPopup;




