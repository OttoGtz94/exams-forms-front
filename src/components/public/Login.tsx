import {
	Button,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { alertToastify } from '../../helpers/index';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const { login } = useAuth();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if ([email, password].includes('')) {
			alertToastify(
				'error',
				'Todos los campos son necesarios.',
			);
			return;
		}

		login({
			email,
			password,
		});
	};
	return (
		<>
			<Typography
				style={{
					width: '100%',
					display: 'flex',
					justifyContent: 'center',
				}}
				variant='h4'>
				Iniciar Sesión
			</Typography>
			<form
				className='formRegisterLogin'
				onSubmit={handleSubmit}>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Correo'
					//focused
					size='small'
					style={{
						width: '350px',
						margin: '10px',
					}}
					margin='normal'
					onChange={(e: any) =>
						setEmail(e.target.value)
					}
				/>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Password'
					//focused
					size='small'
					style={{
						width: '350px',
						margin: '10px',
					}}
					margin='normal'
					type='password'
					onChange={(e: any) =>
						setPassword(e.target.value)
					}
				/>
				<Button
					color='primary'
					variant='contained'
					style={{
						margin: '10px',
						width: '350px',
					}}
					type='submit'>
					Iniciar Sesión
				</Button>
			</form>
		</>
	);
};

export default Login;
