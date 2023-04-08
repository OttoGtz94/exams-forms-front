import { Save } from '@mui/icons-material';
import {
	Autocomplete,
	Box,
	Button,
	FilterOptionsState,
	MenuItem,
	Select,
	Slider,
	TextField,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { countriesTimeZone } from '../../../../countriesTimeZome';
import { CountriesTimeZoneInterface } from '../../../interface/countries.time.zone.interface';
import SelectCountry from '../../Layout/SelectCountry';
import { alertToastify } from '../../../helpers/index';
import useStudent from '../../../hooks/useStudent';
import useAuth from '../../../hooks/useAuth';

const NewStudent = () => {
	const [country, setCountry] =
		useState<CountriesTimeZoneInterface>(
			{} as CountriesTimeZoneInterface,
		);
	const [gender, setGender] = useState('m');
	const [name, setName] = useState('');
	const [city, setCity] = useState('');
	const [curp, setCurp] = useState('');
	const [age, setAge] = useState(18);
	/* 
	convierte la hora de mexico a españa
	const dateMex = new Date();
console.log('Date in mexico', dateMex);
const esDate = dateMexico.toLocaleString('es-ES', {timeZone: 'Europe/Madrid'})
console.log('Date in españa', esDate)

------convierte fecha a fecha de otro pais
const fechamanana = new Date('Sat Apr 08 2023 15:55:09 GMT-0600');
console.log('Date manana in mexico', fechamanana);
const esDate = fechamanana.toLocaleString('es-ES', {timeZone: 'Europe/Madrid'})
console.log('Date in españa', esDate)


*/
	const { postStudent } = useStudent();
	const {
		userInfo: { id },
	} = useAuth();
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			[name, city, curp].includes('') ||
			Object.entries(country).length === 0
		) {
			alertToastify(
				'warn',
				'Todos los campos son necesarios',
			);
			return;
		}

		postStudent({
			name,
			age,
			city,
			timeZone: country.timeZone.trim(),
			curp: curp.toUpperCase(),
			userId: id,
		});
	};
	return (
		<div
			className='containerForm'
			style={{ justifyContent: 'center' }}>
			<form
				className='formExam formStudent'
				onSubmit={handleSubmit}>
				<div className='group groupSelects'>
					<Select
						value={gender}
						label='Genero'
						onChange={(e: any) =>
							setGender(e.target.value)
						}
						size='small'
						sx={{ fontSize: '13px', width: '100px' }}
						className='select'
						variant='standard'>
						<MenuItem
							sx={{ fontSize: '13px' }}
							value={'m'}>
							Hombre
						</MenuItem>
						<MenuItem
							sx={{ fontSize: '13px' }}
							value={'f'}>
							Mujer
						</MenuItem>
					</Select>
					<SelectCountry setCountry={setCountry} />
				</div>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Nombre Completo'
					size='small'
					style={{
						margin: '10px',
					}}
					margin='normal'
					fullWidth
					onChange={(e: any) =>
						setName(e.target.value)
					}
					value={name ? name : ''}
				/>
				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Ciudad'
					size='small'
					style={{
						margin: '10px',
					}}
					margin='normal'
					fullWidth
					onChange={(e: any) =>
						setCity(e.target.value)
					}
					value={city ? city : ''}
				/>

				<TextField
					className='textField'
					color='primary'
					variant='outlined'
					label='Curp'
					size='small'
					style={{
						margin: '10px',
					}}
					margin='normal'
					fullWidth
					onChange={(e: any) =>
						setCurp(e.target.value)
					}
					value={curp ? curp : ''}
				/>
				<div className='group'>
					<div className='sliderContainer'>
						<span>Edad: {age}</span>
						<Slider
							className='slider'
							size='small'
							value={age}
							aria-label='Small'
							//valueLabelDisplay='auto'
							min={6}
							max={100}
							onChange={(e: any) =>
								setAge(e.target.value)
							}
						/>
					</div>
				</div>
				<Button
					color='secondary'
					variant='outlined'
					size='small'
					style={{
						margin: '10px',
						height: '32px',
					}}
					startIcon={<Save />}
					type='submit'>
					Registrar Alumno
				</Button>
			</form>
		</div>
	);
};

export default NewStudent;
