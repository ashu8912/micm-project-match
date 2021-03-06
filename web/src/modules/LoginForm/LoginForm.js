import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './loginForm.scss';
import Button from 'Src/modules/Button';
import InputField from 'Src/modules/InputField';
import { facebookLogin, googleLogin } from 'Src/config/endpoints';
import Icon from 'Src/modules/Icon';
import { Link } from 'react-router-dom';

const LoginField = ({ input, type, placeholder }) => (
  <InputField {...input} type={type} placeholder={placeholder} />
);

LoginField.propTypes = {
  input: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
};

let LoginForm = props => (
  <div className="login-form">
    <a className="facebook-auth-button" href={facebookLogin}>
      <Icon size="1x" name="facebook" />
      Continue with Facebook
      <Icon size="1x" name="arrow-circle-right" />
    </a>
    <a className="google-auth-button" href={googleLogin}>
      <Icon size="1x" name="google" />
      Continue with Google
      <Icon size="1x" name="arrow-circle-right" />
    </a>
    <div className="separator">or</div>
    <div className="form">
      <form onSubmit={props.handleSubmit(data => props.onLogin(data))}>
        <Field
          name="email"
          component={LoginField}
          type="email"
          placeholder="Email"
        />
        <Link className="forgot" to="/forgot-password">
          Forgot password?
        </Link>
        <Field
          name="password"
          component={LoginField}
          type="password"
          placeholder="Password"
        />
        <div className="centered-button">
          <Button>Continue</Button>
        </div>
      </form>
    </div>
  </div>
);

LoginForm.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

export default LoginForm;
