import React from 'react';
import PropTypes from 'prop-types';

class Signup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
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
      const user = await this.props.registerUser(this.state);

      localStorage.setItem('user', JSON.stringify(user));
      this.props.setAuthUser(user);

      this.props.history.push('/');
    } catch (formattedErrors) {
      this.setState({
        errors: formattedErrors,
      });
    }
  }

  render() {
    return (
      <Signup
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}

Signup.propTypes = {
  registerUser: PropTypes.func.isRequired,
  setAuthUser: PropTypes.func.isRequired,
  history: PropTypes.objectOf.isRequired,
};

export default Signup;
