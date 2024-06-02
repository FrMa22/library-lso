import React, { Component } from 'react';
import '../HomeUtente.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardCarrello from './cardCarrello'; // Assicurati che il nome del file sia corretto e coincida con il nome del componente

class Carrello extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
            limite_libri: -1,
            userEmail: localStorage.getItem('userEmail'),
            showRemovePermanentlyButton: false // Stato aggiunto
        };
    }

    componentDidMount() {
        this.getLimiteLibri();
        this.fetchBooks();
    }

    fetchBooks = () => {
        const { userEmail } = this.state;
        fetch('http://localhost:8080/carrello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        .then(response => {
            if (response.status === 204) {
                console.error('Nessun libro nel carrello');
                // Nessun contenuto, quindi non fare nulla
                this.setState({ books: [], loading: false });
                return; // Esci dalla funzione
            } else {
                return response.json(); // Continua a parsare il corpo JSON
            }
        })
        .then(data => {
            if (data) {
                this.setState({ books: data.books, loading: false });
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };
    
    getLimiteLibri = () => {
        const {userEmail, limite_libri } = this.state;
        fetch('http://localhost:8080/get_limite_libri_per_utente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
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
                this.setState({limite_libri: data.limite_libri});
                console.log('valore di limite nuovo : ', data.limite_libri);
            }else{
                this.setState({limite_libri: 0});
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };

    handleConfirm = () => {
        console.log('Conferma cliccata');
        const { userEmail, books, limite_libri } = this.state;
    
        const activeBooks = books.filter(book => book.rimosso_temporaneamente !== 't');
    
        if (activeBooks.length === 0) {
            window.alert('Non ci sono libri da prendere in prestito');
            return; // Esci dalla funzione se non ci sono libri nel carrello
        }
    
        if (activeBooks.length > limite_libri) {
            toast.error(`Il numero di libri nel carrello (${activeBooks.length}) supera il limite consentito (${limite_libri}).`);
            return; // Esci dalla funzione se il numero di libri supera il limite
        }
    
        fetch('http://localhost:8080/creaPrestiti', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail
            })
        })
        .then(response => {
            if (response.status === 202) {
                console.log('Trovati libri con 0 copie disponibili oppure libri gia in prestito');
                return response.json(); // Continua a parsare il corpo JSON
            } else {
                console.log('Prestiti eseguiti con successo');
                toast.info('Prestiti effettuati con successo');
                this.setState({ loading: true });
                this.fetchBooks(); // Ricarica i libri dopo la conferma dei prestiti
                this.getLimiteLibri(); // Ricarica il limite dei libri dopo la conferma dei prestiti
                return null; // Aggiungi questo return per evitare ulteriori operazioni
            }
        })
        .then(data => {
            if (data) {
                // Verifica se il body contiene libri e stampa ciascuno separatamente 
                if (data.body && data.body.length > 0) {
                    console.log('Entrato in if data');
                } else {
                    console.log('Nessun libro trovato con 0 copie');
                }
                if (data.message) {
                    if (data.message.includes('Trovati libri con 0 copie:')) {
                        console.log('Trovati libri con 0 copie disponibili');
                        data.body.forEach(book => console.log(book));
                        // Crea l'alert con l'elenco dei libri
                        const booksList = data.body.join('\n');
                        alert('Questi libri non hanno più copie disponibili e sono stati rimossi:\n' + booksList);
                    } else if (data.message.includes('Trovati libri gia presi in prestito:')) {
                        console.log('Trovati libri gia presi in prestito:');
                        data.body.forEach(book => console.log(book));
                        // Crea l'alert con l'elenco dei libri
                        const booksList = data.body.join('\n');
                        alert('Questi libri sono gia presi in prestito:\n' + booksList);
                    } else if (data.message.includes('Trovati libri con 0 copie e già in prestito nel carrello')) {
                        console.log('Trovati libri con 0 copie e già in prestito nel carrello');
                        data.books_zero_copies.forEach(book => console.log(book));
                        // Crea l'alert con l'elenco dei libri
                        const booksList = data.books_zero_copies.join('\n');
                        data.books_already_borrowed.forEach(book => console.log(book));
                        // Crea l'alert con l'elenco dei libri
                        const booksList2 = data.books_already_borrowed.join('\n');
                        alert('Attenzione! Nel carrello ci sono libri già presi in prestito e libri con 0 copie disponibili \n Libri già presi in prestito: '
                        + booksList + '\nLibri con 0 copie disponibili: ' + booksList2);
                    } else {
                        console.log('Prestiti eseguiti con successo');
                        toast.info('Prestiti effettuati con successo');
                    }
                    this.setState({ loading: true });
                    this.fetchBooks(); // Ricarica i libri dopo ogni risposta del server
                    this.getLimiteLibri(); // Ricarica il limite dei libri dopo ogni risposta del server
                }
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };
    
                
    handleRestoreToCart = (bookTitle) => {
        console.log('Rimetti temporaneamente nel carrello:', bookTitle);
        const { userEmail,showRemovePermanentlyButton } = this.state;
        fetch('http://localhost:8080/restoreToCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                titolo: bookTitle
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('ok'); // Logga "ok" quando la risposta è OK
                const updatedBooks = this.state.books.map(book => {
                    if (book.titolo === bookTitle) {
                        return { ...book, rimosso_temporaneamente: 'f'};
                    }
                    return book;
                });
                this.setState({ books: updatedBooks, showRemovePermanentlyButton: false });
            }
            return response.json();
        })
        .then(data => {
            this.setState({ books: data.books, loading: false });
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };

    handleRemoveTemporarilyFromCart = (bookTitle) => {
        console.log('Rimuovi temporaneamente dal carrello:', bookTitle);
        const { userEmail,showRemovePermanentlyButton } = this.state;
        fetch('http://localhost:8080/removeFromCart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                titolo: bookTitle
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('ok'); // Logga "ok" quando la risposta è OK
                const updatedBooks = this.state.books.map(book => {
                    if (book.titolo === bookTitle) {
                        return { ...book, rimosso_temporaneamente: 't'};
                    }
                    return book;
                });
                this.setState({ books: updatedBooks , showRemovePermanentlyButton: true });
            }
            return response.json();
        })
        .then(data => {
            this.setState({ books: data.books, loading: false });
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };

    handleRemovePermanentlyFromCart = (bookTitle) => {
        console.log('Rimuovi definitivamente dal carrello:', bookTitle);
        const { userEmail} = this.state;
        fetch('http://localhost:8080/rimuovi_definitivamente_carrello', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
                titolo: bookTitle
            })
        })
        .then(response => {
            if (response.status === 200) {
                console.log('Libro rimosso dal carrello');
                toast.success(`Libro "${bookTitle}" rimosso con successo`); // Aggiungi il toast
                this.fetchBooks();
            } else {
                console.error('Errore nella rimozione');
                toast.error(`Errore nella rimozione di "${bookTitle}"`); // Aggiungi il toast
                return;
            }
        })
        .catch(error => {
            console.error('Errore durante la rimozione del libro dal carrello:', error);
            this.setState({ loading: false });
        });
    };
    
    render() {
        const { books, loading, limite_libri, showRemovePermanentlyButton } = this.state;
    
        return (
            <div className="carrello-container">
                <main className="carrello-content">
                    {loading ? (
                        <p style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop:'10rem',
                            fontSize: '1.5rem',
                        }}>
                            Caricamento...
                        </p>
                    ) : (
                        <div>
                            {books.length === 0 ? (
                                <p style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop:'10rem',
                                    fontSize: '1.5rem',
                                }}>
                                    Carrello vuoto
                                </p>
                            ) : (
                                <div className='row' style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'left', marginLeft: '5rem' }}>
                                    {books.map(book => (
                                        <CardCarrello
                                            key={book.titolo} 
                                            nome_libro={book.titolo}
                                            nome_autore={book.autore}
                                            copie_totali={book.copie_totali - book.copie_in_prestito}
                                            durata_prestito={book.durata_prestito}
                                            rimosso_temporaneamente={book.rimosso_temporaneamente}
                                            handleRestoreToCart={() => this.handleRestoreToCart(book.titolo)}
                                            handleRemoveTemporarilyFromCart={() => this.handleRemoveTemporarilyFromCart(book.titolo)}
                                            handleRemovePermanentlyFromCart={()=> this.handleRemovePermanentlyFromCart(book.titolo)}
                                            showRemovePermanentlyButton={showRemovePermanentlyButton}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </main>
                <div className="carrello-container">
                    <ToastContainer position="top-center" autoClose={2000} />
                    {/* Resto del tuo codice di rendering */}
                </div>
                {!loading && (
                    <button 
                        className="confirm-button" 
                        onClick={this.handleConfirm}
                    >
                        Il limite di libri che si possono prendere in prestito è: {limite_libri}.
                        <br />
                        Conferma
                    </button>
                )}
            </div>
        );
    }
    
}

export default Carrello;
