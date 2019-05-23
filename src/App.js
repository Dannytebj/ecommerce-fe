import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import ProductDetails from './components/ProductDetails';
import Shipping from './components/Shipping';
import {SuccessPage, ErrorPage } from './components/RedirectPages';

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/product-details/:productId" component={ProductDetails} />
              <Route exact path="/shipping" component={Shipping} />
              <Route exact path="/success" component={SuccessPage} />
              <Route exact path="/canceled" component={ErrorPage} />
            </Switch>
        </NavBar>
      </Router>
    )

  }
}

export default App;
