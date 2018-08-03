import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const SignUpForm = ({ handleInputChange, handleSubmit, errors }) => (
  <div className="mh-fullscreen bg-img center-vh p-20" style={{ backgroundImage: 'url(assets/img/bg-girl.jpg)' }}>
    <div className="card card-shadowed p-50 w-400 mb-0" style={{ maxWidth: '100%' }}>
      <h5 className="text-uppercase text-center">Register</h5>
      <br />
      <br />
      <form onSubmit={handleSubmit} className="form-type-material">
        <div className="form-group">
          <input
            onChange={handleInputChange}
            name="name"
            type="text"
            className="form-control"
            placeholder="Username"
          />
          {
            errors.name
            && (
              <small className="text-danger">
                {errors.name}
              </small>
            )
          }
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange}
            name="email"
            type="text"
            className="form-control"
            placeholder="Email address"
          />
          {
            errors.email && (
              <small className="text-danger">
                {errors.email}
              </small>
            )
          }
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange}
            name="password"
            type="password"
            className="form-control"
            placeholder="Password"
          />
          {
            errors.password && (
              <small className="text-danger">
                {errors.password}
              </small>
            )
          }
        </div>
        <div className="form-group">
          <input
            onChange={handleInputChange}
            name="password_confirmation"
            type="password"
            className="form-control"
            placeholder="Password (confirm)"
          />
        </div>
        <br />
        <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
      </form>
      <hr className="w-30" />
      <p className="text-center text-muted fs-13 mt-20">
        Already have an account?
        <Link to="/login">Sign in</Link>
      </p>
    </div>
  </div>
);

SignUpForm.propTypes = {
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default SignUpForm;
