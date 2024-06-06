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

    handleAvvisa = (email,scadenza,titolo) => {
        console.log(`Avviso inviato a: ${email}`);
        // Implementa la logica per inviare l'avviso
        console.log(`Scadenza prima della chiamata: ${scadenza}`);
        // Costruisci il corpo della richiesta come oggetto JSON
    const requestBody = JSON.stringify({ titolo, email, scadenza });

    // Invia la richiesta POST con il corpo JSON
    fetch('http://localhost:8080/messaggio', {
        method: 'POST',
        headers: {  
            'Content-Type': 'application/json'
        },
        body: requestBody
    })
            .then(response => {
                if (response.ok) {
                    console.log('Messaggio creato');
                } else {
                    console.error('Errore nella creazione della notifica');
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta:', error);
            });
    };

    loadPrestiti = () => {
        // Imposta lo stato di caricamento
        this.setState({ loadingPrestiti: true });
    
        console.log("recupero dati dal server");
    
        fetch('http://localhost:8080/scaduti')
            .then(response => {
                if (response.status === 200) {
                    return response.json();
                } else if (response.status === 202) {
                    this.setState({ prestiti: [], loadingPrestiti: false });
                    throw new Error('Nessun prestito scaduto trovato');
                } else {
                    throw new Error('Errore durante il recupero dei prestiti');
                }
            })
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
                        ) : prestiti.length > 0 ? (
                            <div className="prestiti-scaduti-list">
                                {prestiti.map((prestito) => (
                                    <UtenteScaduto
                                        key={prestito.email}
                                        email={prestito.email}
                                        nomeLibro={prestito.titolo}
                                        dataPrestito={prestito.data_prestito}
                                        dataFinePrestito={prestito.data_restituzione}
                                        onAvvisa={() => this.handleAvvisa(prestito.email,prestito.data_restituzione,prestito.titolo)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <p>Non ci sono prestiti scaduti</p>
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




