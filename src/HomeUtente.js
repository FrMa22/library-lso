import React, { Component } from 'react';
import HomeUtenteBase from './components/homeUtenteBase';
import Carrello from './components/carrello';
import NavBar from './components/navBar';
import SearchPopup from './components/searchPopup';
import SchermataRicerca from './components/schermataRicerca';
import LibriInPrestito from './components/libriInPrestito';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class HomeUtente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentScreen: 1, // 1: HomeUtenteBase, 2: Carrello, 3: SchermataRicerca
            isSearchPopupOpen: false,
            searchParams: { keyword: '', category: [] },
            searchKey: 0, // Aggiungi una chiave per forzare il remounting
            notification: null, // Stato per memorizzare la notifica
            userEmail: localStorage.getItem('userEmail'),
        };
        this.pollingInterval = null; // Intervallo per il polling
    }

    componentDidMount() {
        // Avvia il polling al caricamento del componente
        this.startPolling();
    }

    componentWillUnmount() {
        // Interrompi il polling quando il componente viene smontato
        this.stopPolling();
    }

    startPolling = () => {
        // Imposta l'intervallo di polling per controllare le notifiche ogni 5 secondi
        this.pollingInterval = setInterval(this.checkNotification, 5000);
    };

    stopPolling = () => {
        // Interrompi l'intervallo di polling
        clearInterval(this.pollingInterval);
    };

    checkNotification = () => {
        const { userEmail } = this.state;
        // Effettua una richiesta al backend per controllare se ci sono nuove notifiche
        fetch('http://localhost:8080/check_notifiche', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        }) // Modifica il percorso secondo la tua implementazione nel backend
            .then(response => {
                console.log("entrato in reponse");
                if (response.status === 200) {
                    console.log('Recuperata una notifica');
                    return response.json(); // Continua a parsare il corpo JSON
                } 
            })
            .then(data => {
                if (data.message.includes('Notifica inviata con successo')) {
                    console.log("entrato in data");
                    // Aggiorna lo stato del componente con la notifica ricevuta
                    this.setState({ notification: data.notification });
                    //this.handleNotificationConfirmation();

                    fetch('http://localhost:8080/rimuovi_notifica', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: userEmail,
                            notification: data.notification
                        })
                    }) // Modifica il percorso secondo la tua implementazione nel backend
                        .then(response => {
                            if (response.status === 200) {
                                console.log('Notifica rimossa con successo dal database');
                                // Resetta lo stato della notifica nel componente
                            }
                        })
                        .catch(error => {
                            console.error('Errore durante la rimozione della notifica:', error);
                        });

                    window.alert(data.notification);
                    this.setState({ notification: null });
                }
            })
            .catch(error => {
                console.error('Errore durante il polling delle notifiche:', error);
            });
    };
    
   /*  handleNotificationConfirmation = () => {
        const {userEmail, notification } = this.state;
        console.log('cliccato ok ');
        if (notification) {
            // Effettua una richiesta al backend per rimuovere la notifica dal database
            fetch('http://localhost:8080/rimuovi_notifica', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    notification: notification
                })
            }) // Modifica il percorso secondo la tua implementazione nel backend
                .then(response => {
                    if (response.status === 200) {
                        console.log('Notifica rimossa con successo dal database');
                        // Resetta lo stato della notifica nel componente
                        this.setState({ notification: null });
                    }
                })
                .catch(error => {
                    console.error('Errore durante la rimozione della notifica:', error);
                });
        }
    };
     */

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
        const { currentScreen, isSearchPopupOpen, searchParams, searchKey, notification } = this.state;

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

                <div className="carrello-container">
                    <ToastContainer position="top-center" autoClose={5000} />
                    {/* Resto del tuo codice di rendering */}
                </div>
            </>
        );
    }
}

export default HomeUtente;
