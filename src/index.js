import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/Login';
import SingleArticle from './components/SingleArticle';
import CreateArticle from './components/CreateArticle';
 
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<BrowserRouter>
		<div>
			<Navbar />
			<Route exact path="/" component={Welcome} />
			<Route path="/login" component={Login} />
			<Route path="/article/:slug" component={SingleArticle} />
			<Route path="/articles/create" component={CreateArticle} />
			<Footer />
		</div>
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
