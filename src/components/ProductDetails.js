import React, { Component } from 'react'

class ProductDetails extends Component {
  constructor(props) {
    super(props);
  }
  // componentWillReceiveProps(nextProps) {
  //   if( nextProps) {
  //     console.log("NextProps",nextProps);
  //   }
  // }
  render() {
    const { product } = this.props;
    console.log(product, "Yoooo");
    return (
      <div className="container product-details">
        <div className="modal fade bd-example-modal-lg" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div class="product-img">
              <img src={require(`../styles/asset/${product.image}`)} alt="..." />
              </div>
              <div class="details">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate ratione distinctio eveniet, magni nulla molestias eaque sequi vel ex. Non illo error quasi vitae voluptate ratione distinctio autem accusantium mollitia.
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductDetails;
