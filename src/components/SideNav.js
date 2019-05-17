import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
// import PropTypes from 'prop-types';
import Products from './Products';

import { getDepartments, getCategoriesInDept, getProducts } from '../actions/productActions';

class SideNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      selectedDept: 0
    }
  }
  componentWillMount() {
    this.props.getDepartments();
    this.props.getProducts(this.state.offset);
  }
  getCategories = (event, department_id) => {
    event.preventDefault();
    this.setState({
      selectedDept: department_id
    });
    this.props.getCategoriesInDept(department_id);
  }
  handlePageClick = data => {
    let selected = data.selected;
    let offset = Math.ceil(selected * 20);

    this.setState({ offset });
    this.props.getProducts(offset);
  };
  render() {
    const departments = this.props.departments.map(({ department_id, name }) => (
      <li 
      className={(department_id === this.state.selectedDept) ? "list-group-item active"  : "list-group-item"}
      key={department_id}
      onClick={(e) => this.getCategories(e, department_id)}
      >
      {name}
      </li>
    ));
    const categories = this.props.deptCategories.map(({ category_id, name }) => (
      <li 
      className={(category_id === 1) ? "list-group-item active"  : "list-group-item"}
      key={category_id}
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
              <input type="text" className="form-control" placeholder="Search" />
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
            {(this.props.products.rows) ? <Products productsObj={this.props.products} /> : ''}
            {this.props.children}
          </div>
        </div>

      </div>
    )
  }
}
SideNav.propTypes = {
};
const mapStateToProps = state => ({
  departments: state.products.departments,
  deptCategories: state.products.deptCategories,
  products: state.products.fetchedProducts
});

export default connect(mapStateToProps, { getDepartments, getCategoriesInDept, getProducts })(SideNav);
