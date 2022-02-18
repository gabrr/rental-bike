import React from 'react'
import styled from "styled-components";
import { pageIn } from 'animations';

export const SignInUp: React.FC = ({ children }) => {
	return (
		<Div>
			<h1 className="title">Biker</h1>
			<h4 className="subtitle">Your Bike Rental</h4>
			{children}
		</Div>
	)
}

const Div = styled.div`
	height: 100vh;
	width: 100%;
	animation: ${pageIn} 300ms ease-in-out;
	background-color: var(--background-color);

	.title {
		text-align: center;
		padding-top: 10vh;
		font-size: 3rem;
		font-weight: bold;
		margin: 0;
		color: var(--primary-text);
	}

	.subtitle {
		font-size: 1.7rem;
		text-align: center;
		margin: 0;
		color: var(--secondary-text);
	}

	.greeting_message {
		font-size: 1.3rem;
		color: var(--primary-text);
	}

	form {
		width: 26vw;
		max-width: 280px;
		margin: 10vh auto;
		text-align: center;

		@media(max-width: 800px) {
				width: 80%;
		}
	}

	.inputs {
		margin: 5px 0;
	}
	
	.submit_button {
		min-width: 200px;
		margin-top: 40px;
	}

	.signup_button {
		margin-top: 20px;
	}
`