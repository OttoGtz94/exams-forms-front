import {
	Button,
	Card,
	CardActions,
	CardContent,
	Typography,
} from '@mui/material';
import {
	ExamPropsInterface,
	ExamInterface,
} from '../../../interface/exam.interface';

const Exam = ({
	exam,
	showActions = true,
	onClick = (value: ExamInterface) => {},
}: ExamPropsInterface) => {
	const { name, date, questions } = exam;

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
					{date.toString().split('T')[0]}
				</Typography>
				<Typography variant='h6' component='div'>
					{name}
				</Typography>
				<Typography variant='body2'>
					{questions.length} preguntas.
				</Typography>
			</CardContent>

			{showActions && (
				<CardActions style={{ width: '100p' }}>
					<Button
						size='small'
						color='secondary'
						onClick={() => onClick(exam)}>
						Abrir
					</Button>
				</CardActions>
			)}
		</Card>
	);
};

export default Exam;
