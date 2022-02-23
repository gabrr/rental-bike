import React from 'react'
import styled from 'styled-components'

interface Props extends React.AllHTMLAttributes<HTMLInputElement>{
	className?: string
	error?: string
}

export const Input: React.FC<Props> = ({ className, error, ...rest }) => {
	return (
		<Div className={className}>
			<input {...rest} />
			{error && <p>{error}</p>}
		</Div>
	)
};

const Div = styled.div`
	width: 100%;

	input {
		width: calc(100% - 20px);
		height: 40px;
		border: none;
		padding: 5px 10px;
		background-color: var(--input-background);
		border-radius: var(--border-radius);
		color: var(--primary-text);
	}

	p {
		color: var(--negative);
		text-align: left;
		width: calc(100% - 10px);
		margin: 5px 0 5px 10px;
		font-size: 1.1rem;
	}
`