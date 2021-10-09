import { AxiosResponse } from 'axios';

export function serviceHandler<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
	return new Promise(async (resolve, reject) => {
		try {
			const response: AxiosResponse<T> = await request;

			resolve(response.data);
		} catch (error) {
			reject(error);
		}
	});
}
