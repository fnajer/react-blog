import React from 'react';
import LoginForm from './LoginForm';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
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
      <LoginForm
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default Login;
