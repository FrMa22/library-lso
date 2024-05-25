import react, { Component } from 'react';
import NavBar from './components/navbar';
import Card from './components/card';

class App extends Component {
  render(){
    return (
    <>
      <NavBar />
      <div className='container'>
        <h1>Titolo random</h1>
        <hr/>
        <div className='row'>
          <Card />
        </div>
      </div>
    </>

  );
  }
  
}

export default App;
