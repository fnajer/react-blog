import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Auth from '../Auth';
import Navbar from '../Navbar';
import Welcome from '../Welcome';
import Footer from '../Footer';
import Login from '../Login';
import Signup from '../Signup';
import SingleArticle from '../SingleArticle';
import CreateArticle from '../CreateArticle';
import RedirectIfAuth from '../RedirectIfAuth';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      articles: [],
    };
  }

  componentWillMount() {
    const user = localStorage.getItem('user');

    if (user) {
      this.setState({
        authUser: JSON.parse(user),
      });
    }
  }

  setArticles = (articles) => {
    this.setState({
      articles,
    });
  }

  setAuthUser = (authUser) => {
    this.setState({
      authUser,
    }, () => {
      localStorage.setItem('user', JSON.stringify(authUser));
      this.props.history.push('/');
    });
  }

  render() {
    const { location, authService, articlesService } = this.props;
    return (
      <div>
        {
          location.pathname !== '/signup' && location.pathname !== '/login' &&
          <Navbar authUser={this.state.authUser} />
        }
        <Route
          exact
          path="/"
          render={
            props => (
              <Welcome
                {...props}
                getArticles={articlesService.getArticles}
                setArticles={this.setArticles}
              />
            )
          }
        />
        <RedirectIfAuth
          path="/login"
          component={Login}
          props={{
            loginUser: authService.loginUser,
            setAuthUser: this.setAuthUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <RedirectIfAuth
          path="/signup"
          component={Signup}
          props={{
            registerUser: authService.registerUser,
            setAuthUser: this.setAuthUser,
          }}
          isAuthenticated={this.state.authUser !== null}
        />
        <Route
          path="/article/:slug"
          render={
            props => (
              <SingleArticle
                {...props}
                getArticle={this.props.articlesService.getArticle}
                articles={this.state.articles}
              />
            )
          }
        />
        <Auth
          path="/articles/create"
          component={CreateArticle}
          props={{
            getArticleCategories: articlesService.getArticleCategories,
            createArticle: articlesService.createArticle,
            token: this.state.authUser ? this.state.authUser.token : null,
          }}
          isAuthenticated={this.state.authUser !== null} //weak check, later fix this
        />
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
  articlesService: PropTypes.objectOf(PropTypes.func).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
