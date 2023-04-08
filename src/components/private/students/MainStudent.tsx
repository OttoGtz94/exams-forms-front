import { People, PersonAddAlt1 } from '@mui/icons-material';
import React, { SyntheticEvent, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import NavigationBar from '../../Layout/NavigationBar';
import useStudent from '../../../hooks/useStudent';

const MainStudent = () => {
	/* const [valueNavigation, setValueNavigation] =
		useState('estudiantes'); */

	const { valueNavigation, setValueNavigation } =
		useStudent();
	const navigate = useNavigate();

	const handleClickNavigation = (
		e: SyntheticEvent,
		newValue: string,
	) => {
		setValueNavigation(newValue);
		if (newValue === 'estudiantes') {
			navigate('./');
		} else {
			navigate(newValue);
		}
	};

	return (
		<div className='main'>
			<NavigationBar
				valueNavigation={valueNavigation}
				handleClickNavigation={handleClickNavigation}
				propsBottomNav={[
					{
						label: 'Estudiantes',
						icon: People,
						value: 'estudiantes',
					},
					{
						label: 'Nuevo Estudiante',
						icon: PersonAddAlt1,
						value: 'add-student',
					},
				]}
			/>
			<div className='outletMain'>
				<Outlet />
			</div>
		</div>
	);
};

export default MainStudent;
