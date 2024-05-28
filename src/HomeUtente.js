import React, { Component } from 'react';
import './HomeUtente.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Card from './components/card';
import SearchPopup from './components/searchPopup';

class HomeUtente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            auctions: [],
            loading: true,
            isSearchPopupOpen: false
        };
    }

    componentDidMount() {
        // Esegui una richiesta al backend per ottenere i dati delle aste
        fetch('http://localhost:8080/auctions')
            .then(response => response.json())
            .then(data => {
                // Aggiorna lo stato con i dati ottenuti dal backend
                this.setState({ auctions: data.auctions, loading: false });
            })
            .catch(error => {
                console.error('Errore durante il recupero delle aste:', error);
                this.setState({ loading: false });
            });
    }

    toggleSearchPopup = () => {
        this.setState(prevState => ({
            isSearchPopupOpen: !prevState.isSearchPopupOpen
        }));
    };

    handleSearch = (keyword, category) => {
        // Qui puoi implementare la logica di ricerca
        // Utilizza keyword per la parola chiave di ricerca
        // Utilizza category per la categoria selezionata
        // Esegui la ricerca e aggiorna lo stato con i risultati
        console.log('Ricerca:', keyword, category);
    };

    render() {
        const { auctions, loading, isSearchPopupOpen } = this.state;

        return (
            <>
                <header className="home-header">
                    <div className="left-buttons">
                        {/* Aggiungi qui eventuali altri bottoni nella parte sinistra */}
                    </div>
                    <div className="title">
                        Libri disponibili
                    </div>
                    <div className="right-buttons">
                        <button className="search-button" onClick={this.toggleSearchPopup}>
                            <i className="fas fa-search icon-large"></i>
                        </button>
                        <button className="menu-button">
                            <i className="fas fa-ellipsis-v icon-large"></i>
                        </button>
                    </div>
                </header>
                <main className="home-content">
                    {loading ? (
                        <p>Caricamento...</p>
                    ) : (
                        <div className='row' style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                            {auctions.map(auction => (
                                <Card
                                    key={auction.id}
                                    nome_libro={auction.name}
                                    nome_autore={auction.seller}
                                    durata_prestito={auction.duration} />
                            ))}
                        </div>
                    )}
                    {/* Contenuto principale */}
                </main>
                {/* Popup di ricerca */}
                <SearchPopup
                    isOpen={isSearchPopupOpen}
                    onClose={this.toggleSearchPopup}
                    onSearch={this.handleSearch}
                />
            </>
        );
    }
}

export default HomeUtente;
