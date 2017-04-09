import React from 'react';
import Nav from '../components/Nav';
import Products from '../components/Products';
import Tweets from '../components/Tweets';

class App extends React.Component {
  componentDidMount() {
    $(".button-collapse").sideNav();
  }

  render() {
    return (
      <div className="row">
        <Nav />
        <div className="col s12 m6">  
          <Products />
        </div>
        <div className="col s12 m6">
          <Tweets />
      </div>
      </div>
    );
  }
}

export default App;
