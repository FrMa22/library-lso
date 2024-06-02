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
            isKebabMenuOpen: false,
            isLimitePopupOpen: false,
            limiteAttuale: -1, // Aggiungi lo stato per memorizzare il limite attuale
        };
    }

    componentDidMount() {
        this.getLimiteLibri();
        // Esegui una richiesta al backend per ottenere i dati dei libri
        fetch('http://localhost:8090/libri')
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
        fetch('http://localhost:8090/limite_libri', {
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

    toggleKebabMenu = () => {
        this.setState(prevState => ({
            isKebabMenuOpen: !prevState.isKebabMenuOpen
        }));
    };

    closeKebabMenu = () => {
        this.setState({ isKebabMenuOpen: false });
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
        fetch(`http://localhost:8090/limite_libri?limite=${limite}`, {
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
    


    handleSearch = (keyword, category) => {
        console.log('Ricerca:', keyword, category);
    };

    render() {
        const { libri, loading, isScadutiPopupOpen, isKebabMenuOpen, isLimitePopupOpen, limiteAttuale } = this.state;

        return (
            <>
                <header className="home-header">
                    <div className="left-buttons">
                        {/* Aggiungi qui eventuali altri bottoni nella parte sinistra */}
                    </div>
                    <div className="title">
                        Libri disponibili HOME LIBRAIO
                        <span className="limite-prestiti">Limite attuale dei prestiti: {limiteAttuale}</span>
                    </div>
                    <div className="right-buttons">
                        <div className="menu-wrapper">
                            <button className="menu-button" onClick={this.toggleKebabMenu}>
                                <i className="fas fa-ellipsis-v icon-large"></i>
                            </button>
                            {isKebabMenuOpen && (
                                <div className="kebab-menu">
                                    <button onClick={this.toggleScadutiPopup}>Prestiti scaduti</button>
                                    <button onClick={this.toggleLimitePopup}>Limite copia prestiti</button>
                                    <Link to="/" className="link-button">Esci</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                <main className="home-content">
                    {loading ? (
                        <p>Caricamento...</p>
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


