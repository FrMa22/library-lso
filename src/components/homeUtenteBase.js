import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from './card'; // Assicurati che il nome del componente sia corretto

class HomeUtenteBase extends Component {
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
        fetch('http://localhost:8080/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userEmail,
            })
        })
        .then(response => response.json())
        .then(data => {
            this.setState({ books: data.books, loading: false });
        })
        .catch(error => {
            console.error('Errore durante il recupero dei libri:', error);
            this.setState({ loading: false });
        });
    }

    handleAddToCart = (bookTitle, presente_nel_carrello, copie_totali) => {
        const { userEmail } = this.state;
        if (presente_nel_carrello === 'f' && copie_totali>0) {
            fetch('http://localhost:8080/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: userEmail,
                    bookTitle: bookTitle
                })
            })
            .then(response => {
                if(response.status === 202){
                    window.alert('Accidenti, non ci sono più copie disponibili per questo libro.');
                } else {
                    return response.json(); 
                }
            })
            .then(data => {
                if (data.success) {
                    console.log('Libro aggiunto al carrello con successo');
                    toast.success('Libro inserito nel carrello'); // Show popup after successful addition
                    // Update the state of the added book
                    const updatedBooks = this.state.books.map(book => {
                        if (book.titolo === bookTitle) {
                            return { ...book, presente_nel_carrello: 't' };
                        }
                        return book;
                    });
                    this.setState({ books: updatedBooks });
                } else {
                    console.error('Errore durante l\'aggiunta al carrello:', data.message);
                    // Handle errors if adding to cart fails
                }
            })
            .catch(error => {
                console.error('Errore nella richiesta di aggiunta al carrello:', error);
                // Handle network errors or other exceptions
            });
        } else if (presente_nel_carrello === 't') {
            console.log("valore di presente nel carrello:", presente_nel_carrello);
            window.alert("Questo libro è già nel carrello!");
        } else if (copie_totali == 0) {
            console.log("no copie");
            window.alert("Questo libro non ha copie disponibili!");
        }
    };
    

    render() {
        const { books, loading } = this.state;
    
        return (
            <main className="home-content">
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
                                Nessun libro disponibile
                            </p>
                        ) : (
                            <div className='row' style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'left', marginLeft:'5rem' }}>
                                {books.map(book => (
                                    <Card
                                        key={book.titolo}
                                        nome_libro={book.titolo}
                                        nome_autore={book.autore}
                                        copie_totali={book.copie_totali}
                                        durata_prestito={book.durata_prestito}
                                        presente_nel_carrello={book.presente_nel_carrello}
                                        onAddToCart={(bookTitle, presente_nel_carrello) => this.handleAddToCart(bookTitle, book.presente_nel_carrello, book.copie_totali)}
                                    />
                                ))}
                                <div className="carrello-container">
                                    <ToastContainer position="top-center" autoClose={5000} />
                                    {/* Resto del tuo codice di rendering */}
                                </div>
                            </div>
                            
                        )}
                    </div>
                )}
            </main>
        );
    }
    
}

export default HomeUtenteBase;
