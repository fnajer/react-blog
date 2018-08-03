import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Navbar from '../Navbar';
import Welcome from '../Welcome';
import Footer from '../Footer';
import Login from '../Login';
import Signup from '../Signup';
import SingleArticle from '../SingleArticle';
import CreateArticle from '../CreateArticle';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    });
  }

  componenWillMount() {
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  render() {
    const { location, authService } = this.props;
    return (
      <div>
        {
          location.pathname !== '/signup' && location.pathname !== '/login' &&
          <Navbar authUser={this.state.authUser} />
        }
        <Route exact path="/" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route
          path="/signup"
          render={
            props => (
              <Signup
                {...props}
                registerUser={authService.registerUser}
                setAuthUser={this.setAuthUser}
              />
            )
          }
        />
        <Route path="/article/:slug" component={SingleArticle} />
        <Route path="/articles/create" component={CreateArticle} />
        {
          location.pathname !== '/signup' && location.pathname !== '/login' &&
          <Footer />
        }
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  authService: PropTypes.objectOf(PropTypes.func).isRequired,
};

export default App;
