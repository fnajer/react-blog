import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, withRouter } from 'react-router-dom';

import App from './components/App';
import AuthService from './services/auth';
import ArticlesService from './services/articles';
import NotyficationsService from './services/notifications';

import registerServiceWorker from './registerServiceWorker';

const AppWithRouter = withRouter(App);

ReactDOM.render(
  <BrowserRouter>
    <AppWithRouter
      authService={new AuthService()}
      articlesService={new ArticlesService()}
      notyService={new NotyficationsService()}
    />
  </BrowserRouter>,
  document.getElementById('root'),
);

registerServiceWorker();
