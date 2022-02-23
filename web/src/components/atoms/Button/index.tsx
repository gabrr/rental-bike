import React, { AllHTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends AllHTMLAttributes<HTMLButtonElement> {
	buttonType?: "button" | "submit" | "reset"
	isLoading: boolean
	buttonPurpose: 'negative' | 'default' | 'positive'
}

const BUTTON_BACKGROUND_COLORS = {
	'negative':  'var(--negative)',
	'default': 'var(--button-default)',
	'positive': 'var(--positive)',
}

export const Button: React.FC<Props> = ({
	children,
	className,
	buttonType,
	disabled,
	isLoading,
	buttonPurpose,
	onClick,
}) => {
	return (
		<StyledButton {...{ className, type: buttonType, disabled, isLoading, buttonPurpose, onClick }}>
			{children}
		</StyledButton>
	)

}
const StyledButton = styled.button<Props>`
	background-color: ${({ buttonPurpose }) => BUTTON_BACKGROUND_COLORS[buttonPurpose]};
	border-radius: var(--border-radius);
	border: none;
	padding: 10px 20px;
	color: var(--button-text-default);
	transition: opacity 300ms ease-in-out;
	cursor: pointer;

	pointer-events: ${({ isLoading }) => isLoading ? 'none' : 'all'};
	opacity: ${({ isLoading }) => isLoading ? '0.3' : '1'};
`