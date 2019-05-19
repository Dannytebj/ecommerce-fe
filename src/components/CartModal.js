import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../actions/productActions';

class CartModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      cartItems: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      console.log(nextProps, "Cart")
      this.setState({
        cartItems: nextProps.cartItems
      })
    }
  }

  handleChange = (e, itemId) => {
    e.preventDefault();
    this.props.updateCartItem(itemId, e.target.value)
  }
  removeItemFromCart(e, itemId) {
    e.preventDefault();

  }
  render() {
    let items;
    if( this.props.cartItems.length > 0) {
    items = this.state.cartItems.map(item => {
      const attr = item.attributes.split(',');
      const size = attr[0];
      const color = attr[1];
      // const price = (item.item_id)
      return (
        <div className="body-content custom-row" key={item.item_id}>
          <div className="custom-col-3 item-img">
            <img src={require(`../styles/asset/${item.image}`)} alt="..." />
            <span>{item.name}</span>
          </div>

          <div className="custom-col-2 options-col">
            <span>Size: {size}</span>
            <span>Color: {color}</span>
          </div>

          <div className="custom-col-3 qty-item">
            <input type="number" min={1} value={item.quantity} onChange={(e) => this.handleChange(e, item.item_id)} />
          </div>
          <div className="custom-col-2">
            ${ Number(item.price) * item.quantity }
          </div>
          <div className="custom-col-1 actions-col">
            <i className="fas fa-times-circle" onClick={(e) => this.removeItemFromCart(e, item.item_id)}></i>
          </div>
        </div>
      )
    });
  }
    return (
      <div className="modal-wrapper">
        <div className="modal fade" id="cartModal" tabIndex="-1" role="dialog" aria-labelledby="cartModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cartModalLabel">Your Cart</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-header-wrapper">
                  <div className="header custom-row">
                    <div className="custom-col-3 item-img">Item</div>
                    <div className="custom-col-2">Option</div>
                    <div className="custom-col-2">Quantity</div>
                    <div className="custom-col-2">Price</div>
                    <div className="custom-col-1">Action</div>
                  </div>
                </div>

                <div className="cart-table">
                  <div className="cart-body">
                    {(this.props.cartItems.length > 0) ? items : 'Empty cart :('}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Checkout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => ({
});
export default connect(mapStateToProps, { updateCartItem })(CartModal);
