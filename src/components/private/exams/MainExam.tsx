import {
	AddBox,
	AssignmentInd,
	AssignmentTurnedIn,
	Favorite,
	Quiz,
	Restore,
} from '@mui/icons-material';
import {
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import React, { SyntheticEvent, useState } from 'react';
import { useEffect } from 'react';
import {
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import NavigationBar from '../../Layout/NavigationBar';
import useExam from '../../../hooks/useExam';

const MainExam = () => {
	const { valueNavigation, setValueNavigation } =
		useExam();

	const navigate = useNavigate();

	const handleClickNavigation = (
		e: SyntheticEvent,
		newValue: string,
	) => {
		setValueNavigation(newValue);
		if (newValue === 'examenes') {
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
						label: 'Examenes',
						icon: Quiz,
						value: 'examenes',
					},
					{
						label: 'Asignados',
						icon: AssignmentInd,
						value: 'assigneds',
					},
					{
						label: 'Resueltos',
						icon: AssignmentTurnedIn,
						value: 'answered',
					},
					{
						label: 'Nuevo Examen',
						icon: AddBox,
						value: 'add-exam',
					},
				]}
			/>
			<div className='outletMain'>
				<Outlet />
			</div>
		</div>
	);
};

export default MainExam;
