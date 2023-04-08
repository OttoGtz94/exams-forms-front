import { Autocomplete, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { countriesTimeZone } from '../../../countriesTimeZome';
import {
	CountriesTimeZoneInterface,
	PropsSelectCountryInterface,
} from '../../interface/countries.time.zone.interface';

const SelectCountry = ({
	setCountry,
}: PropsSelectCountryInterface) => {
	const countries = countriesTimeZone;
	return (
		<>
			<Autocomplete
				className='selectCountry'
				sx={{ width: 230, margin: '10px' }}
				options={countries}
				autoHighlight
				onInputChange={(
					e: any,
					newInputValue: string,
				) => {
					if (newInputValue.split(' - ').length > 1) {
						const objCountry = countries.filter(
							(c: CountriesTimeZoneInterface) =>
								c.timeZone.includes(
									newInputValue.split(' - ')[1],
								),
						);
						setCountry({
							idCountry: objCountry[0].idCountry,
							utc: objCountry[0].utc.trim(),
							timeZone:
								objCountry[0].timeZone.trim(),
							country: objCountry[0].country.trim(),
							flagCode:
								objCountry[0].flagCode.trim(),
						});
					}
				}}
				getOptionLabel={(
					option: CountriesTimeZoneInterface,
				) => {
					return (
						option.country.trim() +
						' - ' +
						option.timeZone.trim().split('/')[1]
					);
				}}
				renderOption={(props, option) => (
					<Box
						style={{ fontSize: '13px' }}
						component='li'
						sx={{
							'& > img': {
								mr: 2,
								flexShrink: 0,
							},
						}}
						{...props}
						key={option.idCountry}>
						<img
							loading='lazy'
							width='20'
							src={`https://flagcdn.com/w20/${option.flagCode.toLowerCase()}.png`}
							/* srcSet={`https://flagcdn.com/w40/${option.flagCode.toLowerCase()}.png 2x`} */
							alt=''
						/>
						{/* {option.flagCode}{' '} */}
						{option.country.trim()}
						{' - '}
						{option.timeZone.trim().split('/')[1]}
					</Box>
				)}
				renderInput={params => (
					<TextField
						{...params}
						label='Zona Horaria'
						inputProps={{
							...params.inputProps,
							autoComplete: 'new-password', // disable autocomplete and autofill
						}}
						color='primary'
						size='small'
					/>
				)}
			/>
		</>
	);
};

export default SelectCountry;
