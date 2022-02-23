import type { IBike } from 'types'
import z1 from 'assets/z1.png'
import a1 from 'assets/a1.png'
import a2 from 'assets/a2.png'
import a3 from 'assets/a3.png'
import k1 from 'assets/k1.png'
import k2 from 'assets/k2.png'
import _ from 'lodash'


export const bikes = [
	{
		_id: "Bike z1",
		name: 'Bike z1',
		model: 'z',
		color: 'blue',
		img: z1,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			},
			{
				_id: _.uniqueId(),
				userId: "hhjnvjkj",
				startPeriod: new Date(),
				endPeriod: new Date(),
			},
			{
				_id: _.uniqueId(),
				userId: "dfyguhjbh",
				startPeriod: new Date(),
				endPeriod: new Date(),
			},
		]
	},
	{
		_id: "Bike a1",
		name: 'Bike a1',
		model: 'a',
		color: 'blue',
		img: a1,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			}
		]
	},
	{
		_id: "Bike a2",
		name: 'Bike a2',
		model: 'a',
		color: 'yellow',
		img: a2,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			}
		]
	},
	{
		_id: "Bike a3",
		name: 'Bike a3',
		model: 'a',
		color: 'blue',
		img: a3,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			}
		]
	},
	{
		_id: "Bike k1",
		name: 'Bike k1',
		model: 'k',
		color: 'blue',
		img: k1,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			}
		]
	},
	{
		_id: "Bike k2",
		name: 'Bike k2',
		model: 'k',
		color: 'pink',
		img: k2,
		address: 'Centro, Florianópolis',
		reservations: [
			{
				_id: _.uniqueId(),
				userId: "userIdname",
				startPeriod: new Date(),
				endPeriod: new Date(),
			}
		]
	},
]