import { Share } from '@mui/icons-material';
import {
	Badge,
	Button,
	Card,
	CardActions,
	CardContent,
	IconButton,
	Typography,
} from '@mui/material';
import moment from 'moment';
import React from 'react';
import {
	alertToastify,
	getDaysDifference,
} from '../../../helpers/index';
import { ExamAssignedPropsInterface } from '../../../interface/exam.interface';

const ExamAssigned = ({
	exam,
}: ExamAssignedPropsInterface) => {
	const {
		name,
		examenesAsig: {
			dateLimit,
			dateAssigned,
			examen,
			clave,
		},
	} = exam;

	return (
		<Card
			sx={{
				minWidth: 200,
				width: 200,
			}}
			className='exam'>
			<CardContent>
				<Typography
					sx={{ fontSize: 13 }}
					color='text.secondary'
					gutterBottom>
					Quedan{' '}
					{getDaysDifference(dateAssigned, dateLimit)}{' '}
					días.
				</Typography>
				<Typography variant='h6' component='div'>
					{examen.name}
				</Typography>
				<Typography
					sx={{ fontSize: 13 }}
					color='text.secondary'
					gutterBottom>
					{name}
				</Typography>
				{/* <Typography variant='body2'>dsf</Typography> */}
			</CardContent>

			<CardActions>
				<IconButton
					size='large'
					//aria-label='show 17 new notifications'
					color='secondary'
					onClick={() => {
						navigator.clipboard.writeText(clave);
						alertToastify(
							'success',
							'Clave copiada.',
						);
					}}>
					<Share />
				</IconButton>
				{/* <Button size='small' color='secondary'>
					Learn More
				</Button> */}
			</CardActions>
		</Card>
	);
};

export default ExamAssigned;
