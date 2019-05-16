import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false,
      searchTerm: ''
    };
    this.handleHover = this.handleHover.bind(this);
  }
  handleMouseLeave() {
    if (this.state.searchTerm === '') {
      this.handleHover();
    } else {
      return;
    }
  }
  handleHover() {
    const searchIcon = document.getElementById('search-input');
    if (this.state.searchTerm === '') {
      searchIcon.classList.toggle('show');
      this.setState(prevState => ({
        isHovered: !prevState.isHovered,
      }));
    }
  }
  render() {
    return (
      <div className="app-wrapper d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <Link className="navbar-brand" to="#">SHOPMATE</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              <li className="nav-item active">
                <Link className="nav-link" to="/signup">SignUp <span className="sr-only">(current)</span></Link>
              </li> <h3>| </h3>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div id="main-container">
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