import { Dispatch } from 'redux';
import { getReservationByBike } from 'services/reservation';
import { getAllUsers } from 'services/user';
import { notifyError } from 'utils/notifier';
import { UPDATE_USERS } from './constants';


export const getUsers = (dispatch: Dispatch) => {
	getAllUsers()
		.then(async (users) => {
			const usersWithReservations = users.map(async (user) => {
				const reservations = await getReservationByBike(user._id);
	
				return ({
					...user,
					reservations
				})
			})		
	
			dispatch({ 
				type: UPDATE_USERS,
				payload: { users: await Promise.all(usersWithReservations) }
			})
		})
		.catch(error => notifyError(error.request.response))
  
}