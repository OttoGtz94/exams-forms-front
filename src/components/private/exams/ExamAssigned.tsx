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
	hourByZone,
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
					días para el{' '}
					{hourByZone(dateLimit, exam.timeZone)}{' '}
					{exam.timeZone}
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
			</CardContent>

			<CardActions>
				<IconButton
					size='large'
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
			</CardActions>
		</Card>
	);
};

export default ExamAssigned;
