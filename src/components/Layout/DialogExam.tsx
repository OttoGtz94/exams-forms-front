import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Typography,
} from '@mui/material';
import { DialogExamInterface } from '../../interface/dialog.exam.interface';
import {
	QuestionFormInterface,
	ExamInterface,
} from '../../interface/exam.interface';
import { Cancel } from '@mui/icons-material';
import useExam from '../../hooks/useExam';
import { useNavigate } from 'react-router-dom';

const DialogExam = ({
	open,
	examSelected,
	setOpen,
}: DialogExamInterface) => {
	const { name, date, questions } = examSelected;

	const { setExamSelected, setValueNavigation } =
		useExam();
	const navigate = useNavigate();

	return (
		<Dialog
			open={open}
			onClose={() => {
				setExamSelected({} as ExamInterface);
				setOpen(false);
			}}
			fullWidth>
			<DialogActions
				style={{ margin: '0px', padding: '0px' }}>
				<IconButton
					size='small'
					color='error'
					onClick={() => {
						setExamSelected({} as ExamInterface);
						setOpen(false);
					}}>
					<Cancel />
				</IconButton>
			</DialogActions>
			<DialogTitle>{name}</DialogTitle>
			<DialogContent>
				<Typography variant='subtitle2'>
					Creado: {date.toString().split('T')[0]}
				</Typography>
				{questions.map(
					(question: QuestionFormInterface) => (
						<div key={question._id}>
							<Typography variant='body1'>
								{question.question}{' '}
								<Typography variant='caption'>
									{question.points} pts
								</Typography>
							</Typography>
							<Typography
								variant='body2'
								color='secondary'>
								{question.answerCorrect}
							</Typography>
							{question.answersError.map(
								(ae: string, i: number) => (
									<Typography
										variant='subtitle2'
										color='error'
										key={i}>
										{ae}
									</Typography>
								),
							)}
						</div>
					),
				)}
			</DialogContent>
			<DialogActions
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'left',
					padding: '10px 10px',
				}}>
				<Button
					variant='contained'
					color='warning'
					onClick={() => {
						setValueNavigation('add-exam');
						navigate('./add-exam');
					}}>
					Editar
				</Button>
				<Button variant='contained' color='error'>
					Eliminar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogExam;
