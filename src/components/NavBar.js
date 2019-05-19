import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CartModal from './CartModal';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className="app-wrapper d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">SHOPMATE</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

              <div className="d-flex">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cartModal">
                  <i className="fas fa-shopping-basket basket"></i>
                  <span className="badge badge-light">{this.props.cart.length}</span>
                </button>
              </div>

              <li className="nav-item">
                <Link className="nav-link" to="/signup">SignUp <span className="sr-only">(current)</span></Link>
              </li> <h3>| </h3>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div id="main-container">
        <CartModal cartItems={this.props.cart} />
          {this.props.children}
        </div>
        <footer id="sticky-footer" className="py-4 bg-dark text-white-50">
          <div className="container text-center">
            <small>Copyright &copy; SHOPMATE</small>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  cart: state.products.cartItems,
})
export default connect(mapStateToProps, {})(NavBar);
