import { Dispatch } from 'redux';
import { getAllBikes } from 'services/bike';
import { getReservationByBike } from 'services/reservation';
import { notifyError } from 'utils/notifier';
import { UPDATE_BIKES } from './constants';


export const getBikes = (dispatch: Dispatch) => {

	getAllBikes()
		.then(async (bikes) => {
			const bikesWithReservations = bikes.map(async (bike) => {
				const reservations = await getReservationByBike(bike._id);
	
				return ({
					...bike,
					reservations
				})
			})		
	
			dispatch({ 
				type: UPDATE_BIKES,
				payload: { bikes: await Promise.all(bikesWithReservations) }
			})
		})
		.catch(error => notifyError(error.request.response))
  
}