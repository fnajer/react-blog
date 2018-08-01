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
			passwordConfirm: '',
			errors: {}
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
				// show errors to the user

				const formattedErrors = {};

				errors.forEach((error) => {
					formattedErrors[error.field] = error.message;
				});

				this.setState({
					errors: formattedErrors
				});
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
			        {
			        	this.state.errors['name'] &&
			        	<small className="text-danger">{this.state.errors['name']}</small>
			        }
			      </div>
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="email" type="text" className="form-control" placeholder="Email address" />
			        {
			        	this.state.errors['email'] &&
			        	<small className="text-danger">{this.state.errors['email']}</small>
			        }
			      </div>
			      <div className="form-group">
			        <input onChange={this.handleInputChange} name="password" type="password" className="form-control" placeholder="Password" />
			        {
			        	this.state.errors['password'] &&
			        	<small className="text-danger">{this.state.errors['password']}</small>
			        }
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