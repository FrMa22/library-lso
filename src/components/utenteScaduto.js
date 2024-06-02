// UtenteScaduto.js

import React from 'react';

const UtenteScaduto = ({ email, nomeLibro, dataPrestito, dataFinePrestito, onAvvisa }) => {
    return (
        <div className="utente-scaduto">
            <p>Email: {email}</p>
            <p>Nome Libro: {nomeLibro}</p>
            <p>Data Prestito: {dataPrestito}</p>
            <p>Data Fine Prestito: {dataFinePrestito}</p>
            <button className="avvisa-button" onClick={onAvvisa}>Avvisa</button>
        </div>
    );
}

export default UtenteScaduto;


