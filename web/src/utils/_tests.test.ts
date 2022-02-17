import { isInputValid } from "./inputValidators"

describe('Utilities', () => {
    test('Input Validators', () => {
        expect(isInputValid({ type: 'email', value: 'gh' })).toBe(false)
        expect(isInputValid({ type: 'email', value: 'gabril@jh.cc.cd.cd' })).toBe(true)
        expect(isInputValid({ type: 'email', value: 'gh@gmail.com' })).toBe(true)
        expect(isInputValid({ type: 'email', value: '@gmail.com' })).toBe(false)
        expect(isInputValid({ type: 'email', value: '' })).toBe(false)


        expect(isInputValid({ type: 'password', value: 'gh' })).toBe(false)
        expect(isInputValid({ type: 'password', value: 'hgdhcdgGGHGH6667%$' })).toBe(true)
        expect(isInputValid({ type: 'password', value: 'ghgmailcom8%8989AA' })).toBe(true)
        expect(isInputValid({ type: 'password', value: '@gmail.com' })).toBe(false)
        expect(isInputValid({ type: 'password', value: '' })).toBe(false)
    })
})