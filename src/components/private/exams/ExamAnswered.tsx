import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import React from 'react';
import {
	ExamAnsweredProps,
	StudentExamAnsweredInterface,
} from '../../../interface/exam.interface';

const ExamAnswered = ({
	exam,
	handleClickExam,
}: ExamAnsweredProps) => {
	const { name, examAnswereds } = exam;
	return (
		<Card style={{ width: '250px', margin: '5px' }}>
			<div
				className='barra'
				style={{
					width: '100%',
					height: '5px',
					backgroundColor: examAnswereds.reviewed
						? '#35ca93'
						: '#810c0c',
				}}></div>
			<CardContent>
				<Typography variant='caption'>
					{examAnswereds.date.toString().split('T')[0]}
				</Typography>
				<Typography variant='h6'>{name}</Typography>
				<Typography variant='subtitle2'>
					{examAnswereds.exam.name}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					variant='text'
					color='secondary'
					type='button'
					onClick={() => handleClickExam(exam)}>
					Ver
				</Button>
			</CardActions>
		</Card>
	);
};

export default ExamAnswered;
