import { Dispatch } from 'redux';
import { getReservationByUser, getReservations } from 'services/reservation';
import { notifyError } from 'utils/notifier';
import { UPDATE_RESERVATIONS } from './constants';


export const getAllReservations = (dispatch: Dispatch, role = 'user', userId: string) => {
	if (role === 'admin') {
		return getReservations()
			.then((reservations) => {
				
				dispatch({
					type: UPDATE_RESERVATIONS,
					payload: { reservations }
				})
			})
			.catch(error => notifyError(error.request.response))
	}

	if (!userId) return console.error('User id is empty.')
	getReservationByUser(userId)
		.then((reservations) => {
					
			dispatch({
				type: UPDATE_RESERVATIONS,
				payload: { reservations }
			})
		})
		.catch(error => notifyError(error.request.response))
}