import React from 'react';
import PropTypes from 'prop-types';

import LoginForm from './LoginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await this.props.loginUser(this.state);

      this.props.setAuthUser(user);
    } catch (formattedErrors) {
      this.props.notyService.error('Something went wrong!');
      this.setState({
        errors: formattedErrors,
      });
    }
  }
  render() {
    return (
      <LoginForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
};

export default Login;
