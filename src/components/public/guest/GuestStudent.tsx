import React from 'react';
import { Outlet } from 'react-router-dom';

const GuestStudent = () => {
	return (
		<div className='guest'>
			<Outlet />
		</div>
	);
};

export default GuestStudent;
