import { AnyAction } from 'redux';

export const isPendingAction = (action: AnyAction): boolean => {
	return action.type.endsWith('/pending');
};
export const isRejectedAction = (action: AnyAction): boolean => {
	return action.type.endsWith('/rejected');
};
