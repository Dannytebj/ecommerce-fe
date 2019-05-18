import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSingleProduct, getProductAtributes } from '../actions/productActions';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productAttribute: [],
      selectedSize: '',
      selectedColor: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps) {
      this.setState({
        product: nextProps.product,
        productAttribute: nextProps.productAttribute
      })
      console.log("NextProps", nextProps);
    }
  }

  // static getDerivedStateFromProps(props, state) {
  //   if(props.product !== state.product) {
  //     return {
  //       product: props.product,
  //       productAttribute: props.productAttribute
  //     }
  //   }
  // }

  componentWillMount() {
    const { match: { params: { productId } } } = this.props;
    this.props.getSingleProduct(productId);
    this.props.getProductAtributes(productId)
    console.log(productId);
  }
  renderSizeAttrivalues = ({attribute_value_id, attribute_name, attribute_value }) => (
    <li 
      key={attribute_value_id} 
      onClick={(e) => this.handleSizeSelect(e, attribute_value)}
      className={(attribute_value === this.state.selectedSize) ? "list-group-item active"  : "list-group-item"}>
      {attribute_value}
    </li>
  );
  renderColorAttrivalues = ({attribute_value_id, attribute_name, attribute_value }) => (
    <li key={attribute_value_id} 
    className={(attribute_value === this.state.selectedColor) ? "list-group-item active"  : "list-group-item"}>
    {attribute_value}
    </li>
  );

  handleSizeSelect = (e, option) => {
    e.preventDefault();
    if (this.state.selectedSize === option) {
      this.setState({
        selectedSize: ''
      })
    } else {
      this.setState({
        selectedSize: option
      })
    }

  }

  render() {
    const { product, productAttribute } = this.state;
    let sizes;
    let colors;
    let renderedSizeList;
    let renderedColorList;
    if (productAttribute.length > 0) {
      sizes = productAttribute.filter(attribute => attribute.attribute_name === 'Size');
      colors = productAttribute.filter(attribute => attribute.attribute_name === 'Color');
      renderedSizeList = sizes.map(size => this.renderSizeAttrivalues(size));
      renderedColorList = colors.map(color => this.renderColorAttrivalues(color));
    }
    return (
      <div className="container-fluid product-details-wrapper">
        {(productAttribute.length > 0) ? <div className="card mb-3 product-details" >
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={require(`../styles/asset/${product.image}`)} className="card-img" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h3 className="card-title">{product.name}</h3>
                <h1 className="card-title">{product.price}</h1>
                <p className="card-text">{product.description}</p>
                <div className="details-quantity"><h5>Quantity</h5><input type="number" /> </div>
                <div>
                  <h5>Sizes</h5>
                  <ul className="list-group list-group-horizontal">{(sizes.length > 0) ? renderedSizeList : ''}</ul>
                </div>
                <div>
                  <h5>Colors</h5>
                  <ul className="list-group list-group-horizontal-md">{(colors.length > 0) ? renderedColorList : ''}</ul>
                </div>
                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
              </div>
            </div>
          </div>
        </div> : 'Loading!!!'}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  product: state.products.selectedProduct,
  productAttribute: state.products.productAttributes
})

export default connect(mapStateToProps, {
  getSingleProduct,
  getProductAtributes
})(ProductDetails);
