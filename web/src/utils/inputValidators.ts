import { isInputValidProps } from 'types'

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