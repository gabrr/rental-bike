import { isInputValidProps, isBikeInputValidProps } from 'types'

export const isInputValid: (props: isInputValidProps) => boolean = ({ type, value }) => {
    if (!type) return false

    const validators = {
        'email': (value: string) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        },
        'password': (value: string) => {
            return /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value)
        },
				'name': (value: string) => {
					return value.length > 2
				}
    }

    return validators[type](value)
}

export const INPUT_ERRORS = {
    email: 'Enter a valid email.',
    password: 'Minimum eight characters, at least one letter, one number and one special character.',
		name: 'Your name, should be at least 2 chars.'
}

export const isBikeInputValid: (props: isBikeInputValidProps) => boolean = ({ type, value }) => {
    if (!type) return false

    const validators = {
        'color': (value: string) => {
            return true
        },
        'model': (value: string) => {
					return value.length >= 1
        },
				'name': (value: string) => {
					return value.length > 3
				},
				"img": (value: string) => {
					return true
				},
				'address': (value: string) => {
					return true
				},
				'rating': (value: string) => {
					return true
				},
    }

    return validators[type](value)
}

export const BIKE_INPUT_ERRORS = {
	"name": "It Should be at least 4 chars",
	"model": "It Should be at least 1 char",
	"color": "",
	"img": "",
	"address": "",
	"rating": ""
}

