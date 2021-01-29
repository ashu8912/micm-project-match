import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Captcha from 'Src/modules/Captcha';
import Button from 'Src/modules/Button';
import InputField from 'Src/modules/InputField';
import RadioButton from 'Src/modules/RadioButton';
import { facebookLogin, googleLogin } from 'Src/config/endpoints';
import Icon from 'Src/modules/Icon';
import './registerForm.scss';

const registerValidate = values => {
  const errors = {};
  if (!values.email) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    errors.email = 'Invalid email address';

  if (!values.firstName) errors.firstName = 'Required';
  else if (values.firstName.length > 50)
    errors.firstName = 'Must be less than 50 characters long';

  if (!values.lastName) errors.lastName = 'Required';
  else if (values.lastName.length > 50)
    errors.lastName = 'Must be less than 50 characters long';

  return errors;
};

let RegisterField = ({ input, label, type, meta: { touched, error } }) => (
  <div className={`register-field ${error && touched ? 'error' : ''}`}>
    <InputField {...input} placeholder={label} type={type} />
    <span className="message">{touched && (error && error)}</span>
  </div>
);

RegisterField.propTypes = {
  input: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string
  })
};

let RegisterForm = props => (
  <div className="register-form">
    {!props.complete ? (
      <div>
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
          <form
            onSubmit={props.handleSubmit(data =>
              props.onRegister({ data, push: props.history.push })
            )}
          >
            <Field
              name="firstName"
              component={RegisterField}
              type="text"
              label="First Name"
            />
            <Field
              name="lastName"
              component={RegisterField}
              type="text"
              label="Last Name"
            />
            <Field
              name="email"
              component={RegisterField}
              type="email"
              label="Email"
            />
            <Field
              name="tel"
              component={RegisterField}
              type="text"
              label="Contact Number"
            />
            <Field
              name="type"
              text="I'm a regular user (student, staff, post-doc, non-McGill professor)"
              component={RadioButton}
              type="radio"
              value="STUDENT"
            />
            <Field
              name="type"
              text="I'm a McGill Professor"
              component={RadioButton}
              type="radio"
              value="PROFESSOR"
            />
            <div className="captcha-container">
              <Field name="captchaResponse" component={Captcha} />
            </div>
            <div className="centered-button">
              <Button>Continue</Button>
            </div>
          </form>
        </div>
      </div>
    ) : (
      <div className="form-complete">
        <div>
          A verification link has been e-mailed to {props.email}. Follow it to
          complete your registration by setting your password.
        </div>
        <div className="centered-button">
          <Button
            onClick={() => props.onResendMail({ email: props.email })}
          >
            Resend E-mail
          </Button>
        </div>
      </div>
    )}
  </div>
);

RegisterForm.propTypes = {
  email: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  onResendMail: PropTypes.func.isRequired
};

RegisterForm = reduxForm({
  form: 'register',
  validate: registerValidate
})(RegisterForm);

export default withRouter(RegisterForm);
