import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Home extends React.Component {
	render() {
		return <h1>This is home page</h1>
	}
}

class About extends React.Component {
	render() {
		return <h1>This is about page</h1>
	}
}

ReactDOM.render(
	<BrowserRouter>
		<div>
			<ul>
				<li>
					<Link to="/">Root page</Link>
				</li>
				<li>
					<Link to="/home">Home page</Link>
				</li>
				<li>
					<Link to="/about">About page</Link>
				</li>
			</ul>
			<Route exact path="/" component={App} />
			<Route path="/home" component={Home} />
			<Route path="/about" component={About} />
		</div>
	</BrowserRouter>
	, document.getElementById('root'));

registerServiceWorker();
