import React, { Component } from 'react';
import '../infoPopup.css';
import UtenteInfo from './utenteInfo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class InfoPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            prestiti: []
        };
    }

    handleAvvisa = (email,scadenza,titolo) => {
        console.log(`Avviso inviato a: ${email} e Scadenza prima della chiamata: ${scadenza}`);
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
                    toast.success('Avviso inviato con successo.');
                    console.log('Messaggio creatOo');
                } else {
                    toast.error('Errore nell\'invio dell\'avviso');
                    console.error('Errore nella creazione della notifica');
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta:', error);
            });
    };

    render() {
       // const { prestiti } = this.state;
        const { prestiti,show, onClose,nome_libro } = this.props;

        console.log("Prestiti:", prestiti); // Stampa dei prestiti nel log

        return (
            show && (
                <div className="info-popup-overlay">
                    <div className="info-popup">
                        <div style={{ textAlign: 'center',marginBottom:'5%'}}>
                            <h2>Utenti che hanno preso in prestito {nome_libro} </h2>
                        </div>
                        <div >
                        {prestiti.length > 0 ? 
                            (<div className="prestiti-list">
                                {prestiti.map((prestito) => (
                                    <UtenteInfo
                                        key={prestito.email}
                                        email={prestito.email}
                                        nomeLibro={prestito.titolo}
                                        dataPrestito={prestito.data_prestito}
                                        dataFinePrestito={prestito.data_restituzione}
                                        onAvvisa={() => this.handleAvvisa(prestito.email,prestito.data_restituzione,prestito.titolo)}
                                    />
                                ))}
                            </div>) :
                            ( <div className='no_prestiti_per_libro'>
                                Non ci sono prestiti per questo libro
                            </div>)}
                        </div>
                        <div className="button-container">
                            <button className="close-button" onClick={onClose}>Chiudi</button>
                        </div>
                    </div>
                    <div className="carrello-container">
                        <ToastContainer position="top-center" autoClose={1000} />
                        {/* Resto del tuo codice di rendering */}
                    </div>
                </div>
                
            )
        );
    }
}

export default InfoPopup;

