import React from 'react';
import { Link } from 'react-router-dom';

export const SuccessPage = () => (
  <div className="redirect-page">
    <h2>Payment Successful</h2>
    <Link to="/" className="btn btn-secondary">Go back Home</Link>
  </div>
);
export const ErrorPage = () => (
  <div className="redirect-page">
    <h2>An error occurred :( !! </h2>
    <Link to="/" className="btn btn-secondary">Go back Home</Link>
  </div>
);