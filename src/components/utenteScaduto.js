// UtenteScaduto.js

import React from 'react';

const UtenteScaduto = ({ email, nomeLibro, dataPrestito, dataFinePrestito, onAvvisa }) => {
    
    const handleClick = () => {
        console.log("Email:", email);
        console.log("Data Fine Prestito:", dataFinePrestito);
        onAvvisa(); // Chiamata alla funzione onAvvisa
    };
    
    return (
        <div className="utente-scaduto">
            <p>Email: {email}</p>
            <p>Nome Libro: {nomeLibro}</p>
            <p>Data Prestito: {dataPrestito}</p>
            <p>Data Fine Prestito: {dataFinePrestito}</p>
            {dataFinePrestito && <button className="avvisa-button" onClick={handleClick}>Avvisa</button>}
        </div>
    );
}

export default UtenteScaduto;


