import React, { AllHTMLAttributes } from 'react'
import styled from 'styled-components'

interface Props extends AllHTMLAttributes<HTMLButtonElement>{
	buttonType?: "button" | "submit" | "reset"
}

export const LinkButton: React.FC<Props> = ({ children, className, onClick, buttonType }) => {
	return (
		<Button className={className} onClick={onClick} type={buttonType}>
			{children}
		</Button>
	)
}

const Button = styled.button`
	border: none;
	background-color: transparent;
	text-decoration: underline;
	color: var(--primary-text);
	cursor: pointer;
`