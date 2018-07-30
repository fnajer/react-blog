import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Footer from './components/Footer';
import CreateArticle from './components/CreateArticle';
 
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
			<Navbar />
			<Route exact path="/" component={Welcome} />
			<Route path="/home" component={Home} />
			<Route path="/about" component={About} />
			<Route path="/articles/create" component={CreateArticle} />
			<Footer />
		</div>
	</BrowserRouter>, 
	document.getElementById('root'));

registerServiceWorker();
