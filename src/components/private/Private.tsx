import {
	AppBar,
	Badge,
	Box,
	Container,
	IconButton,
	Menu,
	Toolbar,
	Typography,
} from '@mui/material';
import {
	Mail,
	More,
	Notifications,
} from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

const Private = () => {
	const { hasToken, userInfo, logout } = useAuth();

	useEffect(() => {
		hasToken();
		if (userInfo.auth) {
		} else {
		}
	}, [userInfo.auth]);
	return (
		<div className='private'>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1 }}>
							Test Forms
						</Typography>
						<Box>
							<Link
								style={{
									textDecoration: 'none',
									fontSize: '17px',
									color: '#fff',
									margin: '0px 3px',
								}}
								to={'./'}>
								Dashboard
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									fontSize: '17px',
									color: '#fff',
									margin: '0px 3px',
								}}
								to={'exams'}>
								Examenes
							</Link>
							<Link
								style={{
									textDecoration: 'none',
									fontSize: '17px',
									color: '#fff',
									margin: '0px 5px',
								}}
								to={'students'}>
								Alumnos
							</Link>
						</Box>
						<Box>
							<IconButton
								size='large'
								//aria-label='show 17 new notifications'
								color='inherit'>
								<Badge
									badgeContent={1}
									color='error'>
									<Notifications />
								</Badge>
							</IconButton>
						</Box>
						<Box>
							<IconButton onClick={() => logout()}>
								<FontAwesomeIcon
									icon={faPowerOff}
								/>
							</IconButton>
						</Box>
					</Toolbar>
				</AppBar>
			</Box>

			<div className='containerOutlet'>
				<Outlet />
			</div>
		</div>
	);
};

export default Private;
