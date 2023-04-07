import { toast, ToastOptions } from 'react-toastify';

export const alertToastify = (
	type: string = 'success',
	msg: string,
) => {
	const options: ToastOptions = {
		position: 'top-right',
		autoClose: 500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: 'dark',
	};
	return type === 'success'
		? toast.success(msg, options)
		: type === 'warn'
		? toast.warn(msg, options)
		: toast.error(msg, options);
};
