import { ThunkHandler } from '../types';

export const pendingHandler: ThunkHandler = state => {
	state.isLoading = true;
	state.error = '';
};
export const rejectedHandler: ThunkHandler = (state, { payload }) => {
	state.isLoading = false;
	state.error = payload;
};
