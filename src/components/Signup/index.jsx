import React from 'react';
import { Link } from 'react-router-dom';
import { validateAll } from 'indicative';

class Signup extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			password: '',
			passwordConfirm: ''
		};

	}

	handleInputChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		// validating user data

		const data = this.state;

		const rules = {
			name: 'required|string',
			email: 'required|email',
			password: 'required|string|min:6|confirmed',
		}

		validateAll(data, rules)
			.then(() => {
				// register the user
				console.log('Success');
			})
			.catch((errors) => {
				console.log(errors);

				// show errors to the user
			});
	}

	render() {
		return (
			<div className="mh-fullscreen bg-img center-vh p-20" style={{backgroundImage: 'url(assets/img/bg-girl.jpg)'}}>
			  <div className="card card-shadowed p-50 w-400 mb-0" style={{maxWidth: '100%'}}>
			    <h5 className="text-uppercase text-center">Register</h5>
			    <br />
			    <br />
			    <form onSubmit={this.handleSubmit} className="form-type-material">
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="name" type="text" className="form-control" placeholder="Username" />
			      </div>
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="email" type="text" className="form-control" placeholder="Email address" />
			      </div>
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="password" type="password" className="form-control" placeholder="Password" />
			      </div>
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="password_confirmation" type="password" className="form-control" placeholder="Password (confirm)" />
			      </div>
			      <br />
			      <button className="btn btn-bold btn-block btn-primary" type="submit">Register</button>
			    </form>
			    <hr className="w-30" />
			    <p className="text-center text-muted fs-13 mt-20">Already have an account?
			      <Link to="/login">Sign in</Link>
			    </p>
			  </div>
			</div>
		);
	}
}

export default Signup;