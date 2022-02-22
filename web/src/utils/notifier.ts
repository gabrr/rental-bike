import { toast } from 'react-toastify';

export const notifyError = (error: string) => toast(error, {
	autoClose: 2000,
	hideProgressBar: true,
	type: 'error',
	style: { backgroundColor: 'var(--negative)', color: 'var(--text-primary)' }
})