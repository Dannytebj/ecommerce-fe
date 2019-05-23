import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getShippingRegion, updateCustomerAddress } from '../actions/shippingActions';


const initialState = {
  address_1: '',
  address_2: '',
  city: '',
  region: '',
  postal_code: '',
  country: '',
  shipping_region_id: '',
  shipping_regions: [],
  shipping_option: ''
}
class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentWillMount() {
    this.props.getShippingRegion();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps){
      console.log(nextProps, "KKIOOK");
      this.setState({
        shipping_regions: nextProps.shippingRegion
      })
    } 
  if (nextProps.user) {
    const {address_1, address_2, city, region, postal_code, country, shipping_region_id} = nextProps.user;
    this.setState({
      address_1, address_2, city, region, postal_code, country, shipping_region_id
    });
  }
  }

  handleChange = (event) => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const {address_1, address_2, city, region, postal_code, country, shipping_region_id} = this.state;
    const payload ={
      address_1, address_2, city, region, postal_code, country, shipping_region_id
    }
    this.props.updateCustomerAddress(payload);
  }
  render() {
    const { shipping_regions } = this.state;
    const { address_1 } = this.props.user;
    let regions;
    if( shipping_regions.length > 0) {
      regions = shipping_regions.map((reg) => (
        <option value={reg.shipping_region_id} key={reg.shipping_region_id}>{reg.shipping_region}</option>
      ))
    }
    return (
      <div className="container">
        <h1>Shipping Address</h1>
        <form>
          <div className="form-group">
            <label htmlFor="inputAddress">Address</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"
              name="address_1" onChange={this.handleChange} value={this.state.address_1} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputAddress2">Address 2</label>
            <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"
              name="address_2" onChange={this.handleChange} value={this.state.address_2}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputCity">City</label>
              <input type="text" className="form-control" id="inputCity"
                name="city" onChange={this.handleChange} value={this.state.city} required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="region">Region/State</label>
              <input type="text" className="form-control" id="region"
                name="region" onChange={this.handleChange} value={this.state.region} required
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="postalCode">Postal Code</label>
              <input type="text" className="form-control" id="postalCode"
                name="postal_code" onChange={this.handleChange} value={this.state.postal_code} required
              />
            </div>
          </div>

          <div className="form-row">
          <div className="form-group col-md-4">
              <label htmlFor="country">Country</label>
              <input type="text" className="form-control" id="country"
                name="country" onChange={this.handleChange} value={this.state.country} required
              />
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="shippingRegion">Shipping Region</label>
              <select id="shippingRegion" className="form-control"
                name="shipping_region_id" onChange={this.handleChange} value={this.state.shipping_region_id} required
              >
                {regions}
              </select>
            </div>
            <div className="form-group col-md-4">
              <label htmlFor="shippingOption">Shipping Option</label>
              <select id="shippingOption" className="form-control"
                name="shipping_option" onChange={this.handleChange} value={this.state.shipping_option}
              >
                <option defaultValue>Choose...</option>
                <option>...</option>
              </select>
            </div>
          </div>
          <div className="shipping-buttons">
            <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Update Address</button>
            {(address_1 !== '' && address_1 !== null) ? <button type="button" id="checkout-button-sku_F7LpUpzJrtJpsR" role="link" className="btn btn-primary" >Place Order</button> : '' }
          </div>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  shippingRegion: state.shipping.shippingRegions,
  user: state.auth.user
});

export default connect(mapStateToProps, { getShippingRegion, updateCustomerAddress })(Shipping);
