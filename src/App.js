import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Orders from './components/Orders';
import HomePage from './components/HomePage';
import SideNav from './components/SideNav';

class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar>
          <SideNav>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/orders" component={Orders} />
            </Switch>
          </SideNav>
        </NavBar>
      </Router>
    )

  }
}

export default App;
