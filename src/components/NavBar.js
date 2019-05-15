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
  handleMouseLeave () {
    if(this.state.searchTerm === '') {
      this.handleHover();
    } else {
      return;
    }
  }
  handleHover() {
    const searchIcon = document.getElementById('search-input');
    if(this.state.searchTerm === '') {
    searchIcon.classList.toggle('show');
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
    }));
  }
  }
  render() {
    return (
      <div className="app-wrapper d-flex flex-column">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand pad-brand" to="#">SHOPMATE</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Women <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/#">Men</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Kids</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Shoes</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">Brands</Link>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0">
              <div className="input-group mr-sm-2 search-area">
                <div className="input-group-prepend" onMouseEnter={this.handleHover}  onMouseLeave={this.handleHover} >
                  <span className="input-group-text" id="basic-search" ><i className="fas fa-search"></i></span>
                </div>
                <input 
                  onMouseLeave={this.handleHover} 
                  onChange={(value) => { this.setState({ searchTerm: value }); }} 
                  type="text" 
                  className="form-control" 
                  id="search-input" 
                  placeholder="Search" 
                  aria-label="Username" 
                  aria-describedby="basic-search" 
                />
              </div>
            </form>
          </div>
        </nav>

        <div className="main-container">
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