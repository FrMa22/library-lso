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

    handleAvvisa = (email) => {
        console.log(`Avviso inviato a: ${email}`);
        // Implementa la logica per inviare l'avviso
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
                                    onAvvisa={() => this.handleAvvisa(prestito.email)}
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

