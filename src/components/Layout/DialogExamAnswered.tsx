import { CheckCircle, Close } from '@mui/icons-material';
import {
	AppBar,
	Button,
	Container,
	Dialog,
	IconButton,
	List,
	ListItem,
	ListItemText,
	Slide,
	Toolbar,
	Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React from 'react';
import { DialogExamAnsweredInterface } from '../../interface/dialog.exam.interface';
import { useEffect } from 'react';
import { QuestionFormInterface } from '../../interface/exam.interface';
import useExam from '../../hooks/useExam';
import {
	ExamAnsweredInterface,
	StudentAnswersInterface,
} from '../../interface/exam.interface';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const DialogExamAnswered = ({
	open,
	setOpen,
	exam,
	handleClickMarkExam,
}: DialogExamAnsweredInterface) => {
	return (
		<Dialog
			fullScreen
			open={open}
			onClose={() => setOpen(false)}
			TransitionComponent={Transition}>
			<AppBar sx={{ position: 'relative' }}>
				<Toolbar>
					<IconButton
						edge='start'
						color='inherit'
						onClick={() => setOpen(false)}
						aria-label='close'>
						<Close />
					</IconButton>
					<Typography
						sx={{ ml: 2, flex: 1 }}
						variant='h6'
						component='div'>
						{exam.name} -{' '}
						{exam.examAnswereds.exam.name}
						{' - '}
						{exam.examAnswereds.score} pts / 100 pts
					</Typography>
					{!exam.examAnswereds.reviewed && (
						<Button
							endIcon={<CheckCircle />}
							autoFocus
							color='inherit'
							onClick={() =>
								handleClickMarkExam(
									exam.examAnswereds._id,
								)
							}>
							Dar por calificado
						</Button>
					)}
				</Toolbar>
			</AppBar>
			<Container
				style={{
					padding: '20px 30px',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'space-around',
				}}>
				<div
					className='answersStudent'
					style={{
						width: '40%',
						padding: '10px 15px',
						backgroundColor: '#141d26',
						borderRadius: '10px',
					}}>
					<Typography variant='h6' color='primary'>
						Respuestas Estudiante
					</Typography>
					{exam.examAnswereds.studentAnswers
						.sort(
							(
								a: StudentAnswersInterface,
								b: StudentAnswersInterface,
							) => {
								if (a.question > b.question) {
									return 1;
								}
								if (a.question < b.question) {
									return -1;
								}
								return 0;
							},
						)
						.map((ans: StudentAnswersInterface) => (
							<div
								key={ans._id}
								style={{
									borderBottom:
										'2px solid #c51f5d',
									padding: '5px 4px',
								}}>
								<Typography variant='body1'>
									{ans.question}
								</Typography>
								<Typography variant='body2'>
									R= {ans.answer}
								</Typography>
							</div>
						))}
				</div>
				<div
					className='answersOriginal'
					style={{
						width: '40%',
						padding: '10px 15px',
						backgroundColor: '#141d26',
						borderRadius: '10px',
					}}>
					<Typography variant='h6' color='secondary'>
						Respuestas Examen
					</Typography>
					{exam.examAnswereds.exam.questions
						.sort(
							(
								a: QuestionFormInterface,
								b: QuestionFormInterface,
							) => {
								if (a.question > b.question) {
									return 1;
								}
								if (a.question < b.question) {
									return -1;
								}
								return 0;
							},
						)
						.map(
							(question: QuestionFormInterface) => (
								<div
									key={question._id}
									style={{
										borderBottom:
											'2px solid #1fc587',
										padding: '5px 4px',
									}}>
									<Typography variant='body1'>
										{question.question}{' '}
										{question.points} pts
									</Typography>
									<Typography variant='body2'>
										R= {question.answerCorrect}{' '}
									</Typography>
								</div>
							),
						)}
				</div>
			</Container>
		</Dialog>
	);
};

export default DialogExamAnswered;
