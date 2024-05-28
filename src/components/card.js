import { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className="card" style={{width:'90%', alignItems:'center' , flexDirection:'row', justifyContent: 'center', margin:'0.5rem'}}>
                <div style={{ textAlign: 'center', paddingLeft:'5rem', paddingRight:'5rem' ,width:'25%'}}>
                    <h5 className="card-title" style={{ textAlign: 'center',color: '#888888', fontSize: '1em' }}>Titolo:</h5>
                    <h5 className="card-title" style={{ textAlign: 'center' }}>{this.props.nome_libro}</h5>
                </div>

                <div style={{ textAlign: 'center', paddingLeft:'5rem', paddingRight:'5rem',width:'25%'}}>    
                    <h5 className="card-title" style={{ textAlign: 'center',color: '#888888', fontSize: '1em' }}>Autore:</h5>
                    <p className="card-author" style={{ textAlign: 'center' }}>{this.props.nome_autore}</p>
                </div>
                <div style={{ textAlign: 'center', paddingLeft:'5rem', paddingRight:'5rem' ,width:'25%'}}>
                    <h5 className="card-title" style={{ textAlign: 'center',color: '#888888', fontSize: '1em' }}>Durata Prestito:</h5>
                    <p className="card-durata-prestito" style={{ textAlign: 'center' }}>{this.props.durata_prestito}</p>
                </div>

                <div style={{ paddingLeft:'5rem', marginLeft:'auto' }}>
                    <button className="btn btn-primary" style={{}}>Aggiungi</button>
                </div>
            </div>
        );
    }
}
export default Card;