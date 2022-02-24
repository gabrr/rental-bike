import { Dispatch } from 'redux';
import { getAllBikes } from 'services/bike';
import { getReservationByBike } from 'services/reservation';
import { IBikeResponse } from 'types/bike';
import { notifyError } from 'utils/notifier';
import { UPDATE_BIKES } from './constants';

export const getBikes = (dispatch: Dispatch) => {

	return getAllBikes()
		.then(async (bikes) => {
			const bikesWithReservations = bikes.map(async (bike) => {
				const reservations = await getReservationByBike(bike._id);
	
				return ({
					...bike,
					reservations
				})
			})
			
			const result = await Promise.all(bikesWithReservations)
			updateBikes(dispatch, result)
			return result
		})
		.catch(error => notifyError(error.request.response))
}

export const updateBikes = (dispatch: Dispatch, bikes: IBikeResponse[]) => {
	dispatch({
		type: UPDATE_BIKES,
		payload: { bikes }
	})
}