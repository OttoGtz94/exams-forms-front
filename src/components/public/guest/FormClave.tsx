import { TextField, Button } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import useGuest from '../../../hooks/useGuest';

const FormClave = () => {
	const [key, setKey] = useState('');

	const { searchKey } = useGuest();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		searchKey(key);
	};
	return (
		<form
			onSubmit={handleSubmit}
			className='formClaveGuest'>
			{/* <p>748-6A2-E78-CE7F-748</p> */}
			<TextField
				variant='filled'
				color='primary'
				label='Clave de examen'
				focused
				onChange={(e: any) => setKey(e.target.value)}
				fullWidth
			/>
			<Button
				color='primary'
				variant='contained'
				type='submit'
				style={{
					//width: 300,
					marginTop: '10px',
				}}
				fullWidth>
				Iniciar
			</Button>
		</form>
	);
};

export default FormClave;
