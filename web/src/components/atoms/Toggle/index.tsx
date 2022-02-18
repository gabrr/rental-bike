import React from 'react'
import styled from 'styled-components'

interface Props {
	isActive?: boolean

}

export const Toggle: React.FC<Props> = ({ isActive }) => {

	return (
		<Div className={isActive ? 'active' : ''}>
			<div className="element1"></div>
			<div className="element2"></div>
		</Div>
	)
}

const Div = styled.div`
	position: relative;
	width: 30px;
	height: 10px;
	z-index: 3;
	cursor: pointer;

	div {
		height: 2px;
		position: absolute;
		background-color: var(--primary-text);
		transition: transform 300ms cubic-bezier(0.075, 0.82, 0.165, 1);
	}

	.element1 {
    width: 30px;
    right: 0;
}

	.element2 {
			width: 20px;
			top: 7px;
			right: 0;
	}

	&.active .element1 {
    transform: translate(4px, 5px) rotate(35deg);
	}

	&.active .element2 {
			transform: translate(3px, -1px) rotate(-36deg);
			width: 30px
	}

`