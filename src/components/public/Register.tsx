import {
	Button,
	FormControl,
	FormGroup,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { alertToastify } from '../../helpers/index';
import useAuth from '../../hooks/useAuth';

const Register = () => {
	const [name, setName] = useState<string>('');
	const [firstName, setFirstName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] =
		useState<string>('');

	const { register } = useAuth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			[
				name,
				firstName,
				email,
				password,
				confirmPassword,
			].includes('')
		) {
			alertToastify(
				'error',
				'Todos los campos son necesario.',
			);
			return;
		}
		if (password.length < 8) {
			alertToastify(
				'error',
				'La contraseña debe de tener al menos 8 caracteres',
			);
			return;
		}

		if (password !== confirmPassword) {
			alertToastify(
				'error',
				'Las contraseñas no coinciden.',
			);
			return;
		}

		register({
			name,
			firstName,
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
				Registrarse
			</Typography>
			<form
				className='formRegisterLogin'
				onSubmit={handleSubmit}>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Nombre'
					size='small'
					style={{
						width: '350px',
						margin: '10px',
					}}
					margin='normal'
					onChange={(e: any) =>
						setName(e.target.value)
					}
				/>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Apellido'
					size='small'
					style={{
						width: '350px',
						margin: '10px',
					}}
					margin='normal'
					onChange={(e: any) =>
						setFirstName(e.target.value)
					}
				/>

				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Correo'
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
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Confirma Password'
					size='small'
					style={{
						width: '350px',
						margin: '10px',
					}}
					margin='normal'
					type='password'
					onChange={(e: any) =>
						setConfirmPassword(e.target.value)
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
					Registrarse
				</Button>
			</form>
		</>
	);
};

export default Register;
