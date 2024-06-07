// HomeLibraio.js
import React, { Component } from 'react';
import './HomeLibraio.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import CardLibraio from './components/cardLibraio';
import ScadutiPopup from './components/scadutiPopup';
import LimitePopup from './components/limitePopup';
import { Link } from 'react-router-dom';

class HomeLibraio extends Component {
    constructor(props) {
        super(props);
        this.state = {
            libri: [],
            loading: true,
            isScadutiPopupOpen: false,
            isLimitePopupOpen: false,
            limiteAttuale: -1, // Aggiungi lo stato per memorizzare il limite attuale
        };
    }

    componentDidMount() {
        this.getLimiteLibri();
        // Esegui una richiesta al backend per ottenere i dati dei libri
        fetch('http://localhost:8080/libri')
            .then(response => response.json())
            .then(data => {
                // Aggiorna lo stato con i dati ottenuti dal backend
                this.setState({ libri: data.libri, loading: false });
            })
            .catch(error => {
                console.error('Errore durante il recupero dei libri:', error);
                this.setState({ loading: false });
            });
    }




    getLimiteLibri = () => {
        const { limiteAttuale } = this.state;
        fetch('http://localhost:8080/limite_libri', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Recuperato il limite');
                // Nessun contenuto, quindi non fare nulla
                return response.json(); // Continua a parsare il corpo JSON
            } else {
                console.error('Errore nel recupero limite');
                return;
            }
        })
        .then(data => {
            if (data.limite_libri) {
                this.setState({limiteAttuale: data.limite_libri });

            }
        })
    };




    toggleScadutiPopup = () => {
        this.setState(prevState => ({
            isScadutiPopupOpen: !prevState.isScadutiPopupOpen
        }));
    };



    toggleLimitePopup = () => {
        this.setState(prevState => ({
            isLimitePopupOpen: !prevState.isLimitePopupOpen
        }));
    };

    handleLimiteConferma = (limite) => {
        console.log('Limite confermato:', limite);
        this.setState({ isLimitePopupOpen: false }); // Aggiorna lo stato con il limite confermato
        this.updateLimiteLibri(limite);
    };


    updateLimiteLibri = (limite) => {
        console.log('Valore limite inviato al server:', limite);
        fetch(`http://localhost:8080/limite_libri?limite=${limite}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                console.log('Limite aggiornato');
                this.setState({ limiteAttuale: limite });
            } else {
                console.error('Errore nell\'aggiornamento del limite');
            }
        })
        .catch(error => {
            console.error('Errore nella richiesta:', error);
        });
    };
    
    handleLogout = () => {
        localStorage.removeItem('userEmail');
        // Logica per il logout, ad esempio, reindirizzamento alla pagina di login
        window.location.href = '/'; // Modifica questo percorso secondo le tue necessità
    };

    render() {
        const { libri, loading, isScadutiPopupOpen, isLimitePopupOpen, limiteAttuale } = this.state;

        return (
            <>
                <header className="home-header" >
                    <div className="left-buttons-libraio" style={{flex:'1'}} >
                       Limite prestiti per utente: {limiteAttuale}

                    </div>
                    <div className="title" style={{fontSize:'40px'}} >
                        <strong >Home Libraio </strong>
                        
                    </div>
                    <div className="right-buttons-libraio"  style={{ flex: '1', display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
                        <button  className = "PrestitiScadutiButton" onClick={this.toggleScadutiPopup}>Prestiti scaduti</button>
                        <button className = "PrestitiScadutiButton" onClick={this.toggleLimitePopup}>Modifica limite prestiti</button>
                        <button onClick={this.handleLogout} className="fas fa-sign-out-alt icon-large" style={{color:'black'}} ></button>
                    </div>
                </header>
                <main className="home-content">
                    {loading ? (
                        <p style={{display:'flex', justifyContent:'center', fontSize:'35px', marginTop: '100px'}}>Caricamento...</p>
                    ) : (
                        <div className='row' style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'left', marginLeft: '5rem' }}>
                            {libri.map(libro => (
                                <CardLibraio
                                    key={libro.titolo}
                                    nome_libro={libro.titolo}
                                    nome_autore={libro.autore}
                                    copie_totali={libro.copie_totali}
                                    copie_prestito={libro.copie_in_prestito} />
                            ))}
                        </div>
                    )}
                </main>
                <ScadutiPopup
                    isOpen={isScadutiPopupOpen}
                    onClose={this.toggleScadutiPopup}
                    onScaduti={this.handleScaduti}
                />
                {isLimitePopupOpen && (
                    <LimitePopup
                        isOpen={isLimitePopupOpen}
                        onClose={this.toggleLimitePopup}
                        onConferma={this.handleLimiteConferma}
                    />
                )}
            </>
        );
    }
}

export default HomeLibraio;


