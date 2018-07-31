import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import SingleArticle from './components/SingleArticle';
import CreateArticle from './components/CreateArticle';
 
import registerServiceWorker from './registerServiceWorker';

class Main extends React.Component {
	render() {
		return (
			<div>
				{
					this.props.location.pathname !== '/signup' && this.props.location.pathname !== '/login' &&
					<Navbar />
				}
				<Route exact path="/" component={Welcome} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Signup} />
				<Route path="/article/:slug" component={SingleArticle} />
				<Route path="/articles/create" component={CreateArticle} />
				{
					this.props.location.pathname !== '/signup' && this.props.location.pathname !== '/login' &&
					<Footer />
				}
			</div>
		);
	}
}

const MainWithRouter = withRouter(Main);

ReactDOM.render(
	<BrowserRouter>
		<MainWithRouter />
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
