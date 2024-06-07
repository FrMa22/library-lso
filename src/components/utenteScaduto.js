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
            <div style={{marginLeft: '30px',marginRight:'40px', textAlign: 'center',fontSize:'20px'}}> 
                <p style={{justifyContent:'center',display:'flex'}}> <strong> Email</strong></p>
                <p>{email}</p>
            </div>
            <div style={{marginRight:'40px', textAlign: 'center',fontSize:'20px'}}> 
                <p style={{justifyContent:'center',display:'flex'}}> <strong> Titolo</strong></p>
                <p>{nomeLibro}</p>
            </div>
            <div style={{marginRight:'40px', textAlign: 'center',fontSize:'20px'}}> 
                <p style={{justifyContent:'center',display:'flex'}}> <strong> Data Prestito</strong></p>
                <p>{dataPrestito}</p>
            </div>
            <div style={{marginRight:'40px', textAlign: 'center',fontSize:'20px'}}> 
                <p style={{justifyContent:'center',display:'flex'}}> <strong> Data Fine Prestito</strong></p>
                <p>{dataFinePrestito}</p>
            </div>
            
            {dataFinePrestito && <button className="avvisa-button" style={{marginRight:'30px'}} onClick={handleClick}>Avvisa</button>}
        </div>
    );
}

export default UtenteScaduto;


