import React, { Component } from 'react';
import ProductDetails from './ProductDetails';

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    }
  }

 
  render() {
    const { rows } = this.props.productsObj;
    const products = rows.map(product => (
      <div className="card col-lg-4 col-md-5 col-sm-9" key={product.product_id}>
        <img 
          src={require(`../styles/asset/${product.image}`)} 
          className="card-img-top" alt="..."
          />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">${product.price}</p>
          <a href="#" className="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" >Buy</a>
        </div>
        <ProductDetails product={product} />
      </div>
    )
    );
    return (
      <div className="row products-card">
        {products}
      </div>
    )
  }
}

export default Products;
