// SearchPopup.js

import React, { Component } from 'react';
import '../searchPopup.css'; // Importa il file CSS per gli stili del popup

class SearchPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKeyword: '',
            selectedCategories: new Set(), // Utilizziamo un Set per tenere traccia delle categorie selezionate
            categories: ["Categoria 1", "Categoria 2", "Categoria 3", "Categoria 4", "Categoria 5", "Categoria 6", "Categoria 7", "Categoria 8", "Categoria 9", "Categoria 10", "Categoria 11", "Categoria 12", "Categoria 13", "Categoria 14", "Categoria 15", "Categoria 16"] // Array di categorie di esempio
        };
    }

    handleKeywordChange = (event) => {
        this.setState({ searchKeyword: event.target.value });
    };

    handleCategoryChange = (event) => {
        const categoryName = event.target.value;
        const { selectedCategories } = this.state;

        // Aggiungi o rimuovi la categoria dal set delle categorie selezionate
        if (selectedCategories.has(categoryName)) {
            selectedCategories.delete(categoryName);
        } else {
            selectedCategories.add(categoryName);
        }

        this.setState({ selectedCategories });
    };

    render() {
        const { searchKeyword, selectedCategories, categories } = this.state;
        const { isOpen, onSearch, onClose } = this.props;

        return (
            isOpen && (
                <div className="search-popup-container"> {/* Container per centrare il popup */}
                    <div className="search-popup">
                        <input
                            type="text"
                            placeholder="Inserisci parola chiave..."
                            value={searchKeyword}
                            onChange={this.handleKeywordChange}
                            className="search-input" // Aggiunto stile per la casella di testo
                        />
                        <div className="category-list"> {/* Lista di categorie con scorrimento */}
                            {categories.map(category => (
                                <div key={category} className="category-item">
                                    <label>
                                        <input
                                            type="checkbox"
                                            value={category}
                                            checked={selectedCategories.has(category)}
                                            onChange={this.handleCategoryChange}
                                        />
                                        {category}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="button-container"> {/* Container per i bottoni */}
                            <button className="close-button"  onClick={onClose} >Chiudi</button>
                            <button className="close-button"  onClick={() => onSearch(searchKeyword, Array.from(selectedCategories))}>Cerca</button>
                        </div>
                    </div>
                </div>
            )
        );
    }
}

export default SearchPopup;
