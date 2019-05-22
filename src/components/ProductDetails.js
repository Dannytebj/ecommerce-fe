import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSingleProduct, getProductAtributes, createNewCart, addItemToCart, updateCartItem, getCartItems } from '../actions/productActions';

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      productAttribute: [],
      selectedSize: '',
      selectedColor: '',
      quantity: 1,
      itemInCart: false,
      itemId: 0
    }
  }

  componentWillMount() {
    const { match: { params: { productId } } } = this.props;
    this.props.getSingleProduct(productId);
    this.props.getProductAtributes(productId);
    const cartId = localStorage.getItem('cartId') || '';
    if (cartId !== '') {
      this.props.getCartItems(cartId);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { match: { params: { productId } } } = this.props;

    this.setState({
      product: nextProps.product,
      productAttribute: nextProps.productAttribute
    })
    if (nextProps.cart.length > 0) {
      const item = nextProps.cart.find((product) => product.product_id === Number(productId));
      if (item !== undefined) {
        this.setState({
          itemInCart: true,
          quantity: item.quantity,
          itemId: item.item_id
        });
      } 
    }
  }

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
  handleColorSelect = (e, option) => {
    e.preventDefault();
    if (this.state.selectedColor === option) {
      this.setState({
        selectedColor: ''
      })
    } else {
      this.setState({
        selectedColor: option
      })
    }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  addToCart = (e, product_id) => {
    e.preventDefault();
    const { selectedColor, selectedSize, quantity, itemInCart, itemId } = this.state;
    const attributes = `${selectedSize}, ${selectedColor}`;
    const cartId = localStorage.getItem('cartId') || '';
    if (cartId !== '' && cartId !== undefined) {
      // If Item already in cart increase quantity
      if (!itemInCart) {
        // add Item to cart
        this.props.addItemToCart(cartId, product_id, attributes);
        this.props.history.push('/');
      } else {
        //  update Cart
        this.props.updateCartItem(itemId, quantity);
        this.props.history.push('/');
      }

    } else {
      this.props.createNewCart()
        .then(({ data }) => {
          localStorage.setItem('cartId', data.cart_id);
          this.props.addItemToCart(data.cart_id, product_id, attributes);
          this.props.history.push('/');
        })
        .catch(error => console.log(error));
    }
  }

  renderSizeAttrivalues = ({ attribute_value_id, attribute_name, attribute_value }) => (
    <li
      key={attribute_value_id}
      onClick={(e) => this.handleSizeSelect(e, attribute_value)}
      className={(attribute_value === this.state.selectedSize) ? "list-group-item active" : "list-group-item"}>
      {attribute_value}
    </li>
  );

  renderColorAttrivalues = ({ attribute_value_id, attribute_name, attribute_value }) => (
    <li key={attribute_value_id}
      onClick={(e) => this.handleColorSelect(e, attribute_value)}
      className={(attribute_value === this.state.selectedColor) ? "list-group-item active" : "list-group-item"}>
      {attribute_value}
    </li>
  );

  render() {
    const { product, productAttribute, itemInCart } = this.state;

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
        {(productAttribute.length > 0 && product.image !== undefined) ? <div className="card mb-3 product-details" >
          <div className="row no-gutters">
            <div className="col-md-3">
              <img src={require(`../styles/asset/${product.image}`)} className="card-img" alt="..." />
            </div>
            <div className="col-md-9">
              <div className="card-body">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.name}</li>
                  </ol>
                </nav>
                <h3 className="card-title">{product.name}</h3>
                <h1 className="card-title">${product.price}</h1>
                <p className="card-text text-muted">{product.description}</p>
                <div className="details-quantity">
                  <h5>Quantity</h5>
                  <input type="number" value={this.state.quantity} min={1} name="quantity" onChange={(e) => this.handleChange(e)} />
                </div>
                <div>
                  <h5>Sizes</h5>
                  <ul className="list-group list-group-horizontal">{(sizes.length > 0) ? renderedSizeList : ''}</ul>
                </div>
                <div>
                  <h5>Colors</h5>
                  <ul className="list-group list-group-horizontal-md">{(colors.length > 0) ? renderedColorList : ''}</ul>
                </div>

                <div>
                  <button className="btn btn-primary my-btn-1" onClick={(e) => this.addToCart(e, product.product_id)}>
                    {(!itemInCart) ? 'Add to Cart' : 'Update Item'}
                  </button>
                </div>
                  {(itemInCart)? <small className="text-muted">Item already in cart, Update quantity</small>: ''}
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
  productAttribute: state.products.productAttributes,
  cart: state.products.cartItems
})

export default connect(mapStateToProps, {
  getSingleProduct,
  getProductAtributes,
  createNewCart,
  addItemToCart,
  updateCartItem,
  getCartItems
})(ProductDetails);
