import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CartModal from './CartModal';
import AuthModal from './auth/AuthModal';
import { resetAuthStore, getUser } from '../actions/authActions';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      isSigningUp: false,
      username: ''
    };
  }

  componentWillMount() {
    if( localStorage.getItem('jwtoken') !== '') {
      this.props.getUser();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.name) {
      this.setState({
        isModalOpen: false,
        username: nextProps.user.name
      })
    }
  }

  openModal = (event) => {
    event.preventDefault();
    if (event.target.value === 'SignUp') {
      return this.setState({
        isSigningUp: true,
        isModalOpen: true
      });
    }
    this.setState({
      isModalOpen: true,
      isSigningUp: false
    });
  }

  closeModal = () => {
    this.setState({
      isModalOpen: false,
      isSigningUp: false
    });
    this.props.resetAuthStore();
  }

  render() {
    const { username } = this.state;
    return (
      <div className="app-wrapper d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">SHOPMATE</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            {(username !== '') ? <small className="text-muted user-name">{username}</small> : 
              <div className="auth-buttons nav-item">
                <button className="sign-up-button" value="SignUp" onClick={this.openModal}>Sign Up</button>
                <button className="sign-in-button" value="SignIn" onClick={this.openModal}>Sign In</button>
              </div>}

              <div className="d-flex">
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#cartModal">
                  <i className="fas fa-shopping-basket basket"></i>
                  <span className="badge badge-light">{this.props.cart.length}</span>
                </button>
              </div>
            </ul>
          </div>
        </nav>

        <div id="main-container">
        {this.props.children}
        <CartModal cartItems={this.props.cart} />
        <AuthModal isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} isSigningUp= {this.state.isSigningUp} />

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
  user: state.auth.user
})
export default connect(mapStateToProps, { resetAuthStore, getUser })(NavBar);
