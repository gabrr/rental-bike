import { toast } from 'react-toastify';

export const notifyError = (error: string) => toast(error, {
	autoClose: 2000,
	hideProgressBar: true,
	type: 'error',
	style: { backgroundColor: 'var(--negative)', color: 'var(--text-primary)' }
})

export const notifySucess = (message: string) => toast(message, {
	autoClose: 2000,
	hideProgressBar: true,
	type: 'success',
	style: { backgroundColor: 'var(--positive)', color: 'var(--text-primary)' }
})

export const notifyInfo = (message: string) => toast(message, {
	autoClose: 2000,
	hideProgressBar: true,
	type: 'info',
	style: { backgroundColor: '#222', color: 'var(--text-primary)' }
})