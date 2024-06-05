import React, { Component } from 'react';
import '../infoPopup.css';
import UtenteInfo from './utenteInfo';

class InfoPopup extends Component {
    constructor(props) {
        super(props);
        //this.state = {
          //  prestiti: [
       //
         //   ]
       // };
    }

    handleAvvisa = (email,scadenza,titolo) => {
        console.log(`Avviso inviato a: ${email}`);
        console.log(`Scadenza prima della chiamata: ${scadenza}`);
        // Costruisci il corpo della richiesta come oggetto JSON
    const requestBody = JSON.stringify({ titolo, email, scadenza });

    // Invia la richiesta POST con il corpo JSON
    fetch('http://localhost:8082/messaggio', {
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

    render() {
       // const { prestiti } = this.state;
        const { prestiti,show, onClose,nome_libro } = this.props;

        console.log("Prestiti:", prestiti); // Stampa dei prestiti nel log

        return (
            show && (
                <div className="search-popup-container">
                    <div className="search-popup">
                        <h2>Utenti che hanno preso in prestito {nome_libro} </h2>
                        <div className="prestiti-list">
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
                        </div>
                        <div className="button-container">
                            <button className="close-button" onClick={onClose}>Chiudi</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default InfoPopup;

