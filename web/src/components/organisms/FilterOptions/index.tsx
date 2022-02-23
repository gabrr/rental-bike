import React from 'react'
import styled from 'styled-components'
import DatetimeRangePicker from 'react-datetime-range-picker'
import { Star } from 'components/atoms'
import { ColorsOptions } from 'components/molecules'
import ReactRating from 'react-rating'
import { useFilter } from 'hooks/filter'
import { LOCATIONS } from 'mock/assistence'

export const FilterOptions: React.FC = () => {

	const { isOpen } = useFilter()

	return (
		<Div id="filter_options" className={isOpen ? "opened" : ""}>
			<h1 className="title">
				Filters
			</h1>
			<section>
				<p className="label">Date and Time</p>
				<DatetimeRangePicker onChange={() => {}} />
			</section>

			<section>
				<p className="label">Color</p>
				<ColorsOptions onChange={() => {}} value={"pink"} />
			</section>

			<section>
				<p className="label">Stars</p>
				<ReactRating emptySymbol={<Star />} fullSymbol={<Star isFull />} />
			</section>

			<section>
				<p className="label">Location</p>
				<select name="locations" id="locations">
					<option value="">Select a location</option>
					{LOCATIONS.map((location, index) => {
						return (
							<option key={"location " + index} value={location}>{location}</option>
						)
					})}
				</select>
			</section>
		</Div>
	)
}

const Div = styled.div`
	position: fixed;
	bottom: 0;
	width: 90%;
	height: clamp(370px, 66vh, 450px);
	padding: 1.2rem 5%;
	background-color: var(--background-color);
	border-top-left-radius: 30px;
	border-top-right-radius: 30px;
	box-shadow: 0px -10px 24px 0px rgba(0, 0, 0, 0.08);
	transform: translateY(70vh);
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
`