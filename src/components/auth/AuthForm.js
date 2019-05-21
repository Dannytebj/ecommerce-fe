import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classname from 'classnames';
import TextBox from '../../utils/TextBox';
import { authFormInputs, setValidationError, setUserData, displayError, signUp, signIn } from '../../actions/authActions';
import { signInValidator, signUpValidator } from '../../utils/validators';
import toastr from 'toastr';

const propTypes = {
  isSigningUp: PropTypes.bool,
  signUp: PropTypes.func.isRequired,
  signIn: PropTypes.func.isRequired,
  authFormInputs: PropTypes.func,
  setValidationError: PropTypes.func,
  name: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  errors: PropTypes.object
};


class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    this.login = this.login.bind(this);
  }

  createUser(){
    const { isValid, errors } = signUpValidator(this.props);
    if (!isValid) {
      return this.props.setValidationError(errors);
    }
    this.props.signUp(this.props);

  }

  login(){
    const { isValid, errors } = signInValidator(this.props);
    if (!isValid) {
      return this.props.setValidationError(errors);
    }
    this.props.signIn(this.props);
  }

  render() {
    const {
      name, email, password, confirmPassword, errors
    } = this.props;
    return (
      <div className="sign-up">
        {(this.props.isSigningUp)
          ? (
            <TextBox
              className={classname('text-box', { 'has-error': errors.email })}
              onChange={value => this.props.authFormInputs({ prop: 'name', value })}
              label="Full Name"
              currentValue={name}
              error={errors.name}
            />
          ) : ''
        }
        <TextBox
          className={classname('text-box', { 'has-error': errors.email })}
          onChange={value => this.props.authFormInputs({ prop: 'email', value })}
          label="Email"
          currentValue={email}
          error={errors.email}
        />
        <TextBox
          className={classname('text-box', { 'has-error': errors.password })}
          onChange={value => this.props.authFormInputs({ prop: 'password', value })}
          label="Password"
          currentValue={password}
          isPassword
          error={errors.password}
        />
        {(this.props.isSigningUp)
          ? (
            <TextBox
              className={classname('text-box', { 'has-error': errors.confirmPassword })}
              onChange={value => this.props.authFormInputs({ prop: 'confirmPassword', value })}
              label="Confirm Password"
              currentValue={confirmPassword}
              isPassword
              error={errors.confirmPassword}
            />
          ) : ''
        }
        {(this.props.isSigningUp) ? <button type="button" onClick={this.createUser}>Create Account</button> :
        <button type="button" onClick={this.login}>Sign In</button> }
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {
    name, email, password, confirmPassword, errors
  } = state.auth;
  return {
    name, email, password, confirmPassword, errors
  }
}
AuthForm.propTypes = propTypes;
export default connect(mapStateToProps, { 
  authFormInputs,
  setValidationError, 
  setUserData,
  displayError,
  signUp,
  signIn })(AuthForm);