import React, { Component } from 'react';
import { connect } from 'react-redux';
import { chargeCard } from '../actions/shippingActions';
import { CardElement, injectStripe } from 'react-stripe-elements';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalcost: ''
    }
    this.submit = this.submit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps) {
      this.setState({
        totalCost: nextProps.totalCost
      })
    }
  }

  async submit(ev) {
    // User clicked submit
    const name = localStorage.getItem('name')
    let { token } = await this.props.stripe.createToken({ name });
     await this.props.chargeCard(token.id, this.props.totalCost);
}

render() {
  return (
    <div className="container checkout">
      <div className="card">
        <div className="card-header">
          T- shirt Shop
          </div>
        <div className="card-body">
          <h5 className="card-title">Would you like to complete the purchase?</h5>
          <CardElement />
          <button className="btn btn-primary" onClick={this.submit} >Pay</button>
        </div>
      </div>

    </div>
  );
}
}
const mapStateToProps = state => ({
  totalCost: state.products.totalCost,
})
export default connect(mapStateToProps, { chargeCard })(injectStripe(CheckoutForm));