import React from 'react'
import styled from 'styled-components'

export const ColorsOptions = () => {

	const COLORS = {
		"black": "#1e1c1a",
		"pink": "#e80066",
		"blue": "#017acb",
		"yellow": "#f2f97e",
	}

	const SELECTED_COLOR = "blue"

	return (
		<Div>
			{Object.entries(COLORS).map(([colorName, colorHash]) => {
				return (
					<ColorCircle colorHash={colorHash} key={colorHash} className={(SELECTED_COLOR === colorName) ? "selected" : ""}>
					</ColorCircle >
				)
			})}
		</Div>
	)
}

const Div = styled.div`
	width: 100%;
	display: flex;
	gap: 10px;
`

const ColorCircle = styled.div<{ colorHash: string }>`
	height: 30px;
	width: 30px;
	border-radius: 100%;
	background-color: ${({ colorHash }) => colorHash};
`