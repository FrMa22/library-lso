import React, { Component } from 'react';
import '../HomeUtente.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import CardInPrestito from './cardInPrestito'; // Make sure the file name matches the component name

class LibriInPrestito extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            loading: true,
            userEmail: localStorage.getItem('userEmail')
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = () => {
        const { userEmail } = this.state;
        fetch('http://localhost:8080/handle_get_prestiti_per_utente', { // Adjust the endpoint as necessary
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
                console.log('Libri in prestito ricevuti');
                return response.json(); // Continua a parsare il corpo JSON
            }
        })
        .then(data => {
            if (data) {
                console.log('Nel data');
                this.setState({ books: data.borrowed_books, loading: false });
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };

    handleReturnBook = (bookTitle) => {
        console.log('Restituisci:', bookTitle);
        const { userEmail } = this.state;
        fetch('http://localhost:8080/restituisci_libro', {
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
                console.log('Libro restituito');
                toast.success(`Libro "${bookTitle}" restituito con successo`); // Aggiungi il toast
                this.fetchBooks();
            } else {
                console.error('Errore nella restituzione');
                toast.error(`Errore nella restituzione di "${bookTitle}"`); // Aggiungi il toast
                return;
            }
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri nel carrello:', error);
            this.setState({ loading: false });
        });
    };

    render() {
        const { books, loading } = this.state;
    
        return (
            <div className="prestito-container">
                <main className="prestito-content">
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
                                    Nessun libro preso in prestito
                                </p>
                            ) : (
                                <div className='row' style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'left', marginLeft: '5rem' }}>
                                    {books.map(book => (
                                        <CardInPrestito
                                            key={book.titolo} 
                                            nome_libro={book.titolo}
                                            dataPrestito={book.data_prestito}
                                            dataRestituzione={book.data_restituzione}
                                            handleReturnBook={() => this.handleReturnBook(book.titolo)}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </main>
                <ToastContainer position="top-center" autoClose={2000} />
            </div>
        );
    }
    
}

export default LibriInPrestito;
