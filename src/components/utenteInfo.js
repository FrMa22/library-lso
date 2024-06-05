import React from 'react';

const UtenteInfo = ({ email, nomeLibro, dataPrestito, dataFinePrestito, onAvvisa }) => {
    const today = new Date();
    const finePrestitoDate = new Date(convertiFormatoData(dataFinePrestito));

    // Funzione per convertire il formato della data
    function convertiFormatoData(data) {
        const parts = data.split('/');
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    console.log(today);
    console.log(finePrestitoDate);



    const handleClick = () => {
        console.log("Email:", email);
        console.log("Data Fine Prestito:", dataFinePrestito);
        onAvvisa(); // Chiamata alla funzione onAvvisa
    };


    return (
        <div className="utente-info">
            <p>Email: {email}</p>
            <p>Nome Libro: {nomeLibro}</p>
            <p>Data Prestito: {dataPrestito}</p>
            <p>Data Fine Prestito: {dataFinePrestito}</p>
            {finePrestitoDate < today && (
                <button className="avvisa-button" onClick={handleClick}>Avvisa</button>
            )}
        </div>
    );
}

export default UtenteInfo;
