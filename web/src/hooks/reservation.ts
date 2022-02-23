import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReservation, deleteReservation, editReservation } from 'services/reservation'
import { getBikes } from 'store/bikes/actions'
import { getUsers } from 'store/users/actions'
import { IEditReservation, IReservation } from 'types/reservation'
import { notifyError, notifySucess } from 'utils/notifier'

export const useReservation = () => {
	const dispatch = useDispatch()
	const [isLoading, setisLoading] = useState(false)
	const reservations = useSelector(state => state.reservationReducer)

	const updateUserAndBikeReservations = () => Promise.all([getUsers(dispatch), getBikes(dispatch)])

	const handleDeleteReservation = (reservationId: string) => {
		deleteReservation(reservationId)
			.then(async () => {
				await updateUserAndBikeReservations()
				setisLoading(false)
				notifySucess('Reservation deleted!')
			})
			.catch(error => {
				notifyError(error.request.response)
				setisLoading(false)
			})
	}

	const handleReservation = (reservation: IReservation) => {
		createReservation(reservation)
			.then(async () => {
				await updateUserAndBikeReservations()
				setisLoading(false)
				notifySucess('Reservation created!')
			})
			.catch(error => {
				notifyError(error.request.response)
				setisLoading(false)
			})
	}

	const handleUpdateReservation = (reservationId: string, newReservation: IEditReservation) => {
		editReservation(reservationId, newReservation)
			.then(async () => {
				await updateUserAndBikeReservations()
				setisLoading(false)
				notifySucess('Reservation updated!')
			})
			.catch(error => {
				notifyError(error.request.response)
				setisLoading(false)
			})
	}

	return {
		handleDeleteReservation,
		handleReservation,
		handleUpdateReservation,
		isLoading,
		reservations,
	}
}