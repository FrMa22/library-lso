import react, { Component } from 'react';
import NavBar from './components/navbar';
import Card from './components/card';
import InputField from './components/inputField';

class Registrazione extends Component {
  render(){
    return (
    <>
      <NavBar />
      <div className='container'>
        <h1>Registrazione</h1>
        <hr/>
        <div className='row'>
          <InputField />
        </div>
      </div>
    </>

  );
  }
  
}

export default Registrazione;