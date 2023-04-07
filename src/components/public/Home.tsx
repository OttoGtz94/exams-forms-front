import {
	AppBar,
	Box,
	Button,
	Toolbar,
	Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import {
	Link,
	Outlet,
	useNavigate,
} from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';

const Home = () => {
	const {
		userInfo: { auth },
		hasToken,
	} = useAuth();

	const navigate = useNavigate();

	useEffect(() => {
		hasToken();
		if (auth) {
			navigate('/user');
		}
	}, [auth]);
	return (
		<div>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<Typography
							variant='h6'
							component='div'
							sx={{ flexGrow: 1 }}>
							News
						</Typography>
						<Link
							style={{
								textDecoration: 'none',
								fontSize: '17px',
								color: '#fff',
								margin: '0px 3px',
							}}
							to={'/login'}>
							Login
						</Link>
						<Link
							style={{
								textDecoration: 'none',
								fontSize: '17px',
								color: '#fff',
								margin: '0px 3px',
							}}
							to={'/register'}>
							Register
						</Link>
					</Toolbar>
				</AppBar>
			</Box>

			<div className='containerOutlet'>
				<Outlet />
			</div>
		</div>
	);
};

export default Home;
