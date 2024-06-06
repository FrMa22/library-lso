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






    return (
        <div className="utente-info">
            <div style={{ textAlign: 'center', paddingLeft: '2rem', paddingRight: '2rem'}}>
                <h5 className="card-email" style={{ fontSize: '1em' }}>Email:</h5>
                <h5 className="card-email" >{email}</h5>
            </div>
            <div style={{ textAlign: 'center', paddingLeft: '2rem', paddingRight: '2rem'}}>
                <h5 className="card-titolo" style={{ fontSize: '1em' }}>Titolo:</h5>
                <h5 className="card-titolo" >{nomeLibro}</h5>
            </div>
            <div style={{ textAlign: 'center', paddingLeft: '2rem', paddingRight: '2rem'}}>
                <h5 className="card-titolo" style={{ fontSize: '1em' }}>Data Prestito:</h5>
                <h5 className="card-titolo" >{dataPrestito}</h5>
            </div>
            <div style={{ textAlign: 'center', paddingLeft: '2rem', paddingRight: '2rem'}}>
                <h5 className="card-titolo" style={{ fontSize: '1em' }}>Data Fine Prestito:</h5>
                <h5 className="card-titolo" >{dataFinePrestito}</h5>
            </div>
            <div style={{ textAlign: 'center', paddingLeft: '2rem', paddingRight: '2rem'}}>
               {finePrestitoDate < today && (
                <button className="avvisa-button" onClick={onAvvisa}>Avvisa</button>
            )} 
            </div>
            
        </div>
    );
}

export default UtenteInfo;
