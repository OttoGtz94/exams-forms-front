import moment from 'moment';
import { toast, ToastOptions } from 'react-toastify';
import { countriesTimeZone } from '../../countriesTimeZome';
import { CountriesTimeZoneInterface } from '../interface/countries.time.zone.interface';

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

export const getDaysDifference = (
	d1: Date,
	d2: Date,
): number => {
	const dm1 = moment(d1.toString().split('T')[0]);
	const dm2 = moment(d2.toString().split('T')[0]);

	const diff = dm2.diff(dm1, 'days');

	return diff;
};

export const hourByZone = (
	fecha: Date,
	timeZone: string,
): string => {
	const f = new Date(fecha);
	const countryInfo = countriesTimeZone.filter(
		(country: CountriesTimeZoneInterface) =>
			country.timeZone.trim().toLowerCase() ===
			timeZone.trim().toLowerCase(),
	);
	const locale = `es-${countryInfo[0].flagCode
		.trim()
		.toUpperCase()}`;
	const fechaEstudiante = f.toLocaleString(locale, {
		timeZone,
	});

	return fechaEstudiante;
};
