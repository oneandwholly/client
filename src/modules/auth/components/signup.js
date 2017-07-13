import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../actions';

class Signup extends Component {
  handleClick(e) {
    e.preventDefault();
    this.props.showSignin();
  }

  handleFormSubmit(formProps) {
      // Call action creator to sign up the user
      this.props.signupUser(formProps);
  }

  renderField({input, label, type, meta: {touched, error}}) {
      return (
          <div>
              <label>{label}</label>
              <div>
                  <input className="form-control" {...input} type={type} />
                  {touched && error && <div className="error">{error}</div>}
              </div>
          </div>
      );
  }

  renderAlert() {
      if (this.props.errorMessage) {
          return <div className="alert alert-danger">
              <strong>Oops!</strong> {this.props.errorMessage}
          </div>
      }
  }

  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    return (
        <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
            <fieldset className="form-group">
                <Field name="username" type="username" component={this.renderField} label="Username:" />
                <Field name="email" type="email" component={this.renderField} label="Email:" />
                <Field name="password" type="password" component={this.renderField} label="Password:" />
                <Field name="passwordConfirm" type="password" component={this.renderField} label="Confirm Password:" />
            </fieldset>
            <div>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary" disabled={submitting}>Sign up!</button>
            </div>
            <button onClick={this.handleClick.bind(this)}>signin</button>
        </form>
    );
  }

}

const validate = values => {
    const errors = {};

    if (!values.email) {
        errors.email = 'Please enter an email';
    }

    if (!values.username) {
        errors.email = 'Please enter a username';
    }

    if (!values.password) {
        errors.password = 'Please enter a password';
    }

    if (!values.passwordConfirm) {
        errors.passwordConfirm = 'Please enter a password confirmation';
    }

    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords must match';
    }

    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error
    };
}

const Form = reduxForm({
    form: 'signup',
    validate
})(Signup);

export default connect(mapStateToProps, actions)(Form);
