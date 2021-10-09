import axios from 'axios';
import { BASE_URL_DEV, BASE_URL_PROD } from './config';

export default axios.create({
	baseURL: process.env.NODE_ENV === 'production' ? BASE_URL_PROD : BASE_URL_DEV,
	headers: {
		'Content-Type': 'application/json; charset=UTF-8',
	},
});
