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

const MainExam = () => {
	const [valueNavigation, setValueNavigation] =
		useState('examenes');

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
			<div className='navigationContainer'>
				<BottomNavigation
					sx={{ width: 500 }}
					value={valueNavigation}
					onChange={handleClickNavigation}>
					<BottomNavigationAction
						label='Examenes'
						value='examenes'
						icon={<Quiz />}
					/>
					<BottomNavigationAction
						label='Asignados'
						value='assigneds'
						icon={<AssignmentInd />}
					/>
					<BottomNavigationAction
						label='Resueltos'
						value='answered'
						icon={<AssignmentTurnedIn />}
					/>
					<BottomNavigationAction
						label='Nuevo Examen'
						value='add-exam'
						icon={<AddBox />}
					/>
				</BottomNavigation>
			</div>
			<div className='outletMain'>
				<Outlet />
			</div>
		</div>
	);
};

export default MainExam;