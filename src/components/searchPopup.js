import React, { Component } from 'react';
import '../searchPopup.css'; // Importa il file CSS per gli stili del popup

class SearchPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            selectedCategory: '', // Single category selection
            categories: [
                "Fantasy", "Distopia", "Romanzo", "Categoriaaaaaaaaaaa",
                "Categoria 5", "Categoria 6", "Categoria 7", "Categoria 8",
                "Categoria 9", "Categoria 10", "Categoria 11", "Categoria 12",
                "Categoria 13", "Categoria 14", "Categoria 15", "Categoria 16"
            ] // Array di categorie di esempio
        };
    }

    handleKeywordChange = (event) => {
        this.setState({ searchKeyword: event.target.value });
    };

    handleCategoryChange = (event) => {
        const categoryName = event.target.value;
        const { selectedCategory } = this.state;
    
        // Se il radio button cliccato è già selezionato, deseleziona la categoria
        if (selectedCategory === categoryName) {
            this.setState({ selectedCategory: '' });
        } else {
            // Altrimenti, seleziona il radio button cliccato
            this.setState({ selectedCategory: categoryName });
        }
    };
    
    handleCategoryClick = (event) => {
        // Assicurati che handleCategoryChange venga chiamato anche se il radio button è già selezionato
        this.handleCategoryChange(event);
    };
    
    

    handleSearch = () => {
        const { searchKeyword, selectedCategory } = this.state;

        // Controlla se almeno una parola chiave o una categoria è stata inserita
        if (!searchKeyword && !selectedCategory) {
            window.alert("Inserisci almeno una parola chiave o seleziona una categoria.");
            return;
        }
        
        console.log("Parola chiave di ricerca:", searchKeyword);
        console.log("Categoria selezionata:", selectedCategory);
        this.props.onSearch(searchKeyword, selectedCategory);
        this.props.onClose(); // Chiudi il popup dopo la ricerca
    };

    handleOverlayClick = (event) => {
        // Impedisci la chiusura del popup se si clicca all'interno del popup
        event.stopPropagation();
    };

    render() {
        const { searchKeyword, selectedCategory, categories } = this.state;
        const { isOpen, onClose } = this.props;

        return (
            isOpen && (
                <div className="searching-popup-overlay" onClick={onClose}>
                    <div className="searching-popup-container" onClick={this.handleOverlayClick}>
                        <div className="searching-popup">
                            <input
                                type="text"
                                placeholder="Inserisci parola chiave..."
                                value={searchKeyword}
                                onChange={this.handleKeywordChange}
                                className="search-input"
                            />
                            <div className="category-list">
                                {categories.map(category => (
                                    <div key={category} className="category-item">
                                        <label>
                                        
                                            <input
                                                type="radio"
                                                value={category}
                                                checked={selectedCategory === category}
                                                onChange={this.handleCategoryChange}
                                                onClick={this.handleCategoryClick} // Aggiungiamo l'evento onClick
                                            />
                                            {category}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="button-container">
                                <button className="closing-button" onClick={onClose}>Chiudi</button>
                                <button className="searching-button" onClick={this.handleSearch}>Cerca</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default SearchPopup;
