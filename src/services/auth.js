import { validateAll } from 'indicative';
import Axios from 'axios';
import config from '../config';

export default class AuthService {
	async registerUser(data) {
		// validating user data

		const rules = {
			name: 'required|string',
			email: 'required|email',
			password: 'required|string|min:1|confirmed',
		}

		const messages = {
			required: 'This {{ field }} is required.',
			'email.email': 'The email is invalid.',
			'password.confirmed': 'The password confirmation does not match.'
		}

		try {
			
			await validateAll(data, rules, messages);

			// register the user
			
			const response = await Axios.post(`${config.apiUrl}/auth/register`, {
				name: data.name,
				email: data.email,
				password: data.password
			});

			return response.data.data;	

		} catch (errors) {

			const formattedErrors = {};

			if (errors.response && errors.response.status == 422) {
				// show errors, which detected on server side, to the user
				formattedErrors['email'] = errors.response.data['email'][0];

				throw formattedErrors;
			}

			// show errors, which detected on front side, to the user
			errors.forEach((error) => {
				formattedErrors[error.field] = error.message;
			});

			throw formattedErrors;
		}

	}
}