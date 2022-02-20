import { keyframes } from "styled-components";

export const pageIn = keyframes`
	from {
		transform: translateY(-20px);
		opacity: 0;
	}
	to {
		transform: translateY(0);
		opacity: 1;
	}
`

export const popping = keyframes`
	from {
		transform: scale(0.9);
		opacity: 0.5;
	}
	to {
		transform: scale(1);
		opacity: 1;
	}
`

