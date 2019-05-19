import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import history from './utils/history';

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/product-details/:productId" component={ProductDetails} />
            </Switch>
        </NavBar>
      </Router>
    )

  }
}

export default App;
