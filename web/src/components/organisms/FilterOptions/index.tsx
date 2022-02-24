import React from 'react'
import styled from 'styled-components'
import DatetimeRangePicker from 'react-datetime-range-picker'
import { Button, Star } from 'components/atoms'
import { ColorsOptions } from 'components/molecules'
import ReactRating from 'react-rating'
import { useFilter } from 'hooks/filter'
import { LOCATIONS } from 'mock/assistence'

export const FilterOptions: React.FC = () => {

	const { isOpen, setfilterOptions } = useFilter()
	
	const handleDateChange = ({ start, end }: { start: string, end: string }) => {
		setfilterOptions(prev => ({ ...prev, timeFrame: { endPeriod: end, startPeriod: start } }))
	}

	const handleColorChange = (color: string) => {
		setfilterOptions(prev => ({ ...prev, colorF: color }))
	}

	const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const value = e.currentTarget.value
		setfilterOptions(prev => ({ ...prev, addressF: value }))
	}

	const resetFilter = () => setfilterOptions({} as any)

	return (
		<Div id="filter_options" className={isOpen ? "opened" : ""}>
			<h1 className="title">
				Filters
			</h1>
			<section>
				<p className="label">Date and Time</p>
				<DatetimeRangePicker onChange={handleDateChange} />
			</section>

			<section>
				<p className="label">Color</p>
				<ColorsOptions onChange={handleColorChange} value={"black"} />
			</section>

			<section>
				<p className="label">Stars</p>
				<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
			</section>

			<section>
				<p className="label">Location</p>
				<select required name="address" id="address" onChange={(e) => handleSelect(e)}>
					<option value="">Select a location</option>
					{LOCATIONS.map((string) => {
						return <option key={string} value={string}>{string}</option>
					})}
				</select>
			</section>

			<Button buttonPurpose='default' isLoading={false} onClick={resetFilter}>
					Reset Filter
			</Button>
		</Div>
	)
}

const Div = styled.div`
	position: fixed;
	bottom: 0;
	width: 90%;
	height: clamp(370px, 75vh, 550px);
	padding: 1.2rem 5%;
	background-color: var(--background-color);
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	box-shadow: 0px -10px 24px 0px rgba(0, 0, 0, 0.08);
	transform: translateY(550vh);
	transition: transform 300ms ease-in-out;

	&.opened {
		transform: translateY(0);
	}

	.title {
		font-size: 1.8rem;
	}

	section {
		.label {
			font-size: 1.5rem;
			color: var(--primary-text);
			font-weight: 600;
		}

		.rdt input {
			background-color: var(--input-background) !important;
			border: none !important;
			border-radius: var(--border-radius);
			padding: 10px 20px;
			color: var(--primary-text);
			margin: 0.5rem 0;
		}
	}

	#locations {
		padding: 10px 20px;
		border: none;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: var(--border-radius);
	}
	
	select {
		padding: 5px 10px;
		height: 50px;
		border: none;
		background-color: var(--input-background);
		color: var(--primary-text);
		border-radius: var(--border-radius);
	}

	button {
		margin-top: 2rem;
	}
`