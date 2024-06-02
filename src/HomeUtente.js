// HomeUtente.js
import React, { Component } from 'react';
import HomeUtenteBase from './components/homeUtenteBase';
import Carrello from './components/carrello';
import NavBar from './components/navBar';
import SearchPopup from './components/searchPopup';
import SchermataRicerca from './components/schermataRicerca';
import LibriInPrestito from './components/libriInPrestito';

class HomeUtente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 1, // 1: HomeUtenteBase, 2: Carrello, 3: SchermataRicerca
            isSearchPopupOpen: false,
            searchParams: { keyword: '', category: [] },
            searchKey: 0 // Aggiungi una chiave per forzare il remounting
        };
    }

    // Funzione per cambiare la schermata
    changeScreen = (screenNumber) => {
        this.setState({ currentScreen: screenNumber });
    };

    // Funzione per gestire l'apertura/chiusura del popup di ricerca
    toggleSearchPopup = () => {
        this.setState(prevState => ({
            isSearchPopupOpen: !prevState.isSearchPopupOpen
        }));
    };

    // Funzione per gestire la ricerca
    handleSearch = (keyword, category) => {
        console.log('Ricerca:', keyword, category);
        // Imposta la schermata corrente su SchermataRicerca e passa i parametri
        this.setState(prevState => ({
            currentScreen: 3,
            searchParams: { keyword, category },
            searchKey: prevState.searchKey + 1 // Incrementa la chiave per forzare il remounting
        }));
    };

    // Funzione per gestire il logout
    handleLogout = () => {
        localStorage.removeItem('userEmail');
        // Logica per il logout, ad esempio, reindirizzamento alla pagina di login
        window.location.href = '/'; // Modifica questo percorso secondo le tue necessità
    };

    render() {
        const { currentScreen, isSearchPopupOpen, searchParams, searchKey } = this.state;

        let componentToDisplay;
        // Determina il componente da visualizzare in base alla schermata corrente
        switch (currentScreen) {
            case 1:
                componentToDisplay = <HomeUtenteBase />;
                break;
            case 2:
                componentToDisplay = <Carrello />;
                break;
            case 3:
                componentToDisplay = <SchermataRicerca key={searchKey} keyword={searchParams.keyword} category={searchParams.category} />;
                break;
            case 4:
                componentToDisplay = <LibriInPrestito/>;
                break;
            default:
                componentToDisplay = <HomeUtenteBase />;
        }

        return (
            <>
                {/* Navbar */}
                <NavBar 
                    toggleSearchPopup={this.toggleSearchPopup} 
                    changeScreen={this.changeScreen} 
                    currentScreen={currentScreen}
                    searchParams={searchParams}
                    onLogout={this.handleLogout} // Passa la funzione di logout come prop
                />
                
                {/* Visualizzazione del componente corrente */}
                {componentToDisplay}

                {/* Popup di ricerca */}
                {isSearchPopupOpen && (
                    <SearchPopup
                        isOpen={isSearchPopupOpen}
                        onClose={this.toggleSearchPopup}
                        onSearch={this.handleSearch}
                    />
                )}
            </>
        );
    }
}

export default HomeUtente;
