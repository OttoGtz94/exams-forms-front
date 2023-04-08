import {
	BottomNavigation,
	BottomNavigationAction,
} from '@mui/material';
import React from 'react';
import {
	PropsNavigationBarInterface,
	PropsBottomNav,
} from '../../interface/navigationbar.interface';

const NavigationBar = ({
	valueNavigation,
	handleClickNavigation,
	propsBottomNav,
}: PropsNavigationBarInterface) => {
	return (
		<div className='navigationContainer'>
			<BottomNavigation
				sx={{ width: 500 }}
				value={valueNavigation}
				onChange={handleClickNavigation}>
				{propsBottomNav.map(
					(bottom: PropsBottomNav, i: number) => (
						<BottomNavigationAction
							label={bottom.label}
							value={bottom.value}
							icon={<bottom.icon />}
							key={i}
						/>
					),
				)}
				{/* <BottomNavigationAction
						label='Examenes'
						value={}
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
					/> */}
			</BottomNavigation>
		</div>
	);
};

export default NavigationBar;
