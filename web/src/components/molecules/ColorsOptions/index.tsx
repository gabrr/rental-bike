import { COLORS } from 'mock/assistence'
import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
	onChange: (value: string) => void
	value: string
}

export const ColorsOptions: React.FC<Props> = ({ onChange, value = "black" }) => {

	const [colorKey, setcolorKey] = useState<string>(value)

	const handleColorChange = (valueChanged: string) => {
		onChange(valueChanged)
		setcolorKey(valueChanged)
	}

	return (
		<Div>
			{Object.entries(COLORS).map(([colorName, colorHash]) => {
				return (
					<ColorCircle
						onClick={() => handleColorChange(colorName)}
						colorHash={colorHash}
						key={colorHash}
						className={(colorKey === colorName) ? "selected" : ""}
					>
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
	height: 27px;
	width: 27px;
	border-radius: 100%;
	background-color: ${({ colorHash }) => colorHash};
	position: relative;
	

	&::after {
		content: "";
		transition: transform 300ms ease-in-out;
		position: absolute;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%) scale(1);
		transform-origin: center;
		left: 50%;
		top: 50%;
		border-radius: 100%;
		border: 2px solid transparent;
	}

	&.selected::after {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		transform: translate(-50%, -50%) scale(1.2);
		left: 50%;
		top: 50%;
		border-radius: 100%;
		border: 2px solid ${({ colorHash }) => colorHash};
	}
`