import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Products from './Products';
import {
  getDepartments,
  getCategoriesInDept,
  getProducts,
  getProuctsByCategory,
  searchProducts,
  dispatchCartId,
  getCartItems,
  getTotalCost
} from '../actions/productActions';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      selectedDept: 0,
      selectedCategory: 0,
      searchTerm: ''
    }
  }
  componentWillMount() {
    this.props.getDepartments();
    this.props.getProducts(this.state.offset);
    const cartId = '' || localStorage.getItem('cartId');
    if (cartId !== '') {
      this.props.dispatchCartId(cartId);
      this.props.getCartItems(cartId);
      this.props.getTotalCost(cartId);
    }
  }
  
   /**
   * Gets categories in department
   * @param {number} department_id
   * @param {} event
   *
   * @memberof HomePage
   */
  getCategories = (event, department_id) => {
    event.preventDefault();
    this.setState({
      selectedDept: department_id
    });
    this.props.getCategoriesInDept(department_id);
  }

  getSearchTerm = (event) => {
    event.preventDefault();
    this.setState({
      searchTerm: event.target.value
    });
  }

  keyPress = (event) => {
    event.target.value.trim();
    if(event.keyCode === 13 && event.target.value !== ''){
      this.props.searchProducts(event.target.value);
   } else {
     this.props.getProducts(0);
   }
  }

  /**
   * Gets products by category
   * @param {number} category_id
   * @param {} event
   *
   * @memberof HomePage
   */
  getCategoryProducts = (event, category_id) => {
    event.preventDefault();
    if (this.state.selectedCategory === category_id) {
      this.setState({ selectedCategory: 0 });
      this.props.getProducts(0);
    } else {
      this.setState({
        selectedCategory: category_id
      });
      this.props.getProuctsByCategory(category_id);
    }
  }

  /**
   * Helper that handles pagination clicks
   * @param {} data - pagination object
   * @memberof HomePage
   */
  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 20);

    this.setState({ offset });
    this.props.getProducts(offset);
  };

  viewProduct = (e, product) => {
    e.preventDefault();
    this.props.history.push(`/product-details/${product.product_id}`);
  }

 

  render() {
    const departments = this.props.departments.map(({ department_id, name }) => (
      <li 
      className={(department_id === this.state.selectedDept) ? "list-group-item active"  : "list-group-item"}
      key={department_id}
      onClick={(e) => this.getCategories(e, department_id)} > {name} </li>
    ));

    const categories = this.props.deptCategories.map(({ category_id, name }) => (
      <li 
      className={(category_id === this.state.selectedCategory) ? "list-group-item active"  : "list-group-item"}
      key={category_id}
      onClick={(e) => this.getCategoryProducts(e, category_id)}
      >
      {name}
      </li>
    ));

    const pageCount = Math.ceil(this.props.products.count / 20);

    return (
      <div className="container-fluid side-nav-wrapper">
        <div className="row">
          <div className="col-md-3 col-sm-8">
            <div className="card">
              <div className="card-header">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search" 
                onChange={this.getSearchTerm}
                onKeyDown={this.keyPress}
              />
              </div>
              <span className="card-header justify-content-center dept"><b>DEPARTMENTS</b></span>
              <ul className="list-group list-group-flush">
                {departments}
              </ul>
            </div>
            {(this.props.deptCategories.length > 0) ? <div className="card categories">
              <span className="card-header justify-content-center dept"><b>CATEGORIES</b></span>
              <ul className="list-group list-group-flush">
                {categories}
              </ul>
            </div> : '' }
          </div>

          <div className="col-md-9 col-sm-12" id="main-container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
              
                <ReactPaginate
                  previousLabel={'previous'}
                  nextLabel={'next'}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={this.handlePageClick}
                  containerClassName='pagination'
                  subContainerClassName='pagination'
                  activeClassName='active'
                  breakClassName="page-item"
                  breakLabel={<a className="page-link">...</a>}
                  pageClassName="page-item"
                  previousClassName="page-item"
                  nextClassName="page-item"
                  pageLinkClassName="page-link"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                />
              </div>
            </div>
            {(this.props.products.rows) ? <Products productsObj={this.props.products} viewProduct={this.viewProduct} /> : ''}
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  departments: state.products.departments,
  deptCategories: state.products.deptCategories,
  products: state.products.fetchedProducts
});

export default connect(
    mapStateToProps, { 
    getDepartments, 
    getCategoriesInDept, 
    getProducts, 
    getProuctsByCategory,
    searchProducts,
    dispatchCartId,
    getCartItems,
    getTotalCost
  })(HomePage);
