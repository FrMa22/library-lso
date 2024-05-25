import { Component } from 'react';
import logo from '../logo.svg'

class Card extends Component{
    render(){
        return (
            <div className="card" style={{width: '18rem'}}>
                <div className="card-body">
                    <h5 className="card-title">*Inserire qui il nome del libro*</h5>
                    <p className="card-text" style={{textAlign : 'center'}}>*Autore libro*  </p>
                    <p className="card-price" style={{textAlign : 'end'}}>*10 €*</p>
                    <button className="btn btn-primary" style={{alignContent : 'center'}}>Aggiungi</button>
                </div>
            </div>
        );
    }
}
export default Card;
