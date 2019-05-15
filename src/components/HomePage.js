import React, { Component } from 'react';
import img1 from '../styles/asset/img1.jpg';
import img2 from '../styles/asset/img2.jpg';
import img3 from '../styles/asset/img3.jpg';
import img4 from '../styles/asset/img4.jpg';
import img5 from '../styles/asset/img5.jpg';

class HomePage extends Component {
  render() {
    return (
      <div className="home-page-wrapper">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src={img1} class="d-block w-100" alt="..." />
            </div>
            <div class="carousel-item">
              <img src={img2} class="d-block w-100" alt="..." />
            </div>
          </div>
          <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <div className="container">
          <div className="row">
            <div class="card full-width-card">
              <div class="sales-img col-sm-4"><img src={img5} class="d-block w-100" alt="..." /></div>
              <div className="sales-desc col-sm-8">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                  Earum perferendis at asperiores aliquid quia nostrum, suscipit accusantium
                </p>
                <a href="#" className="btn btn-danger my-btn-1">Shop Now</a>
              </div>
            </div>
          </div>
          <div className="row banner-card">
            <div className="col-sm-4">
              <div class="wow-upper-left">
                <p>WOW</p>
                <h3>Check</h3>
                <h3>What !!</h3>
              </div>
              <div class="wow-lower-left"><img src={img4} class="d-block w-100" alt="..." /></div>
            </div>
            <div className="col-sm-8">
              <div className="right-top">
                <img src={img3} class="d-block w-100" alt="..." />
              </div>
              <div className="right-bottom">
                <h1>Let the Games Begin</h1>
                <h4>Registration is on -get ready for the open</h4>
                <a className="btn btn-danger my-btn-1" href="#">Register</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

export default HomePage;
