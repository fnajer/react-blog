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

import AuthService from './services/auth';
 
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			authUser: null
		};
	}

	componentDidMount() {
		const user = localStorage.getItem('user');

		if (user) {
			this.setState({
				authUser: JSON.parse(user)
			})
		}
	}

	setAuthUser = (authUser) => {
		this.setState({
			authUser: authUser
		});
	}

	render() {
		const { location } = this.props
		return (
			<div>
				{
					location.pathname !== '/signup' && location.pathname !== '/login' &&
					<Navbar authUser={this.state.authUser} />
				}
				<Route exact path="/" component={Welcome} />
				<Route path="/login" component={Login} />
				<Route path="/signup" render={
					(props) => <Signup {...props} 
						registerUser = {this.props.authService.registerUser}
						setAuthUser={this.setAuthUser} />
				}/>
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

const AppWithRouter = withRouter(App);

ReactDOM.render(
	<BrowserRouter>
		<AppWithRouter authService={new AuthService()} />
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
