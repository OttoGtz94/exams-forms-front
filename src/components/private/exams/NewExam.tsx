import {
	AddCircleOutline,
	Save,
} from '@mui/icons-material';
import {
	Button,
	Slider,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import {
	QuestionFormInterface,
	ExamInterface,
} from '../../../interface/exam.interface';
import { alertToastify } from '../../../helpers/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useExam from '../../../hooks/useExam';
import useAuth from '../../../hooks/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewExam = () => {
	const [name, setName] = useState('Nombre del examen');
	const [question, setQuestion] = useState('');
	const [answerCorrect, setAnswerCorrect] = useState('');
	const [answersError1, setAnswersError1] = useState('');
	const [answersError2, setAnswersError2] = useState('');
	const [answersError3, setAnswersError3] = useState('');
	const [points, setPoints] = useState<number>(100);
	const [remainingPoints, setRemainingPoints] =
		useState(100);
	const [modeEdit, setModeEdit] = useState(false);

	const [questions, setQuestions] = useState<
		QuestionFormInterface[]
	>([]);

	const navigate = useNavigate();
	const {
		postExam,
		examSelected,
		setExamSelected,
		setValueNavigation,
		editExam,
	} = useExam();
	const {
		userInfo: { id },
	} = useAuth();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			name === '' ||
			name === 'Nombre del examen' ||
			name.length < 4
		) {
			alertToastify(
				'warn',
				'Agrega un nombre valido al examen',
			);
			return;
		} else if (questions.length < 2) {
			alertToastify(
				'warn',
				'Debes de tener al menos 2 preguntas',
			);
			return;
		} else if (remainingPoints > 0) {
			alertToastify(
				'warn',
				'Debes de ocupar los 100 pts',
			);
			return;
		}
		if (!modeEdit) {
			postExam({
				name,
				questions,
				userId: id,
			});
		} else {
			editExam({
				name,
				questions,
				userId: id,
			});
		}
	};

	const handleClickDeleteQuestion = (
		question: QuestionFormInterface,
	) => {
		const questionUnique = questions.filter(
			(q: QuestionFormInterface) =>
				q.question.toLowerCase().trim() ===
					question.question.toLowerCase().trim() &&
				q.points,
		);
		const pointsQuestionDelete = questionUnique[0].points;
		const newQuestios = questions.filter(
			(q: QuestionFormInterface) =>
				q.question.toLowerCase().trim() !==
				question.question.toLowerCase().trim(),
		);
		setQuestions(newQuestios);
		setRemainingPoints(
			remainingPoints + pointsQuestionDelete,
		);
	};

	const handleClickAddQuestion = () => {
		if (
			[
				question,
				answerCorrect,
				answersError1,
				answersError2,
				answersError3,
			].includes('')
		) {
			alertToastify(
				'warn',
				'Todos los campos son obligatorios',
			);
			return;
		}

		if (points === 0) {
			alertToastify(
				'warn',
				'Cada pregunta debe de tener un puntuaje.',
			);
			return;
		}
		questions.push({
			question,
			answerCorrect,
			answersError: [
				answersError1,
				answersError2,
				answersError3,
			],
			points,
		});
		setRemainingPoints(remainingPoints - points);
		setQuestion('');
		setAnswerCorrect('');
		setAnswersError1('');
		setAnswersError2('');
		setAnswersError3('');
		setPoints(1);
	};

	useEffect(() => {
		if (Object.entries(examSelected).length > 0) {
			setName(examSelected.name);
			setQuestions(examSelected.questions);
			setRemainingPoints(0);
			setPoints(0);
			setModeEdit(true);
		}
	}, []);

	return (
		<div className='containerForm'>
			<form className='formExam' onSubmit={handleSubmit}>
				<div className='infoFormExam'>
					<TextField
						className='textField'
						color='primary'
						variant='outlined'
						label='Nombre Examen'
						//focused
						size='small'
						style={{
							//width: '350px',
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setName(e.target.value)
						}
						value={name ? name : ''}
						focused={name ? true : false}
					/>
					{remainingPoints > 0 && (
						<Button
							color='secondary'
							variant='outlined'
							size='small'
							style={{
								margin: '10px',
								height: '32px',
							}}
							startIcon={<AddCircleOutline />}
							onClick={handleClickAddQuestion}>
							Agregar Pregunta
						</Button>
					)}
				</div>

				<div className='questions'>
					<p className='pts'>
						{points} pts / {remainingPoints} pts
					</p>
					<Slider
						value={points}
						aria-label='percentage'
						valueLabelDisplay='auto'
						color='secondary'
						max={remainingPoints}
						min={1}
						onChange={(e: any) => {
							setPoints(e.target.value);
						}}
					/>

					<TextField
						className='textField'
						color='primary'
						variant='outlined'
						label='Pregunta'
						size='small'
						style={{
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setQuestion(e.target.value)
						}
						value={question ? question : ''}
						disabled={remainingPoints <= 0 && true}
					/>
					<TextField
						className='textField'
						color='secondary'
						variant='outlined'
						label='Respuesta Correcta'
						size='small'
						style={{
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setAnswerCorrect(e.target.value)
						}
						value={answerCorrect ? answerCorrect : ''}
						disabled={remainingPoints <= 0 && true}
					/>
					<TextField
						className='textField'
						color='error'
						variant='outlined'
						label='Respuesta Incorrecta'
						size='small'
						style={{
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setAnswersError1(e.target.value)
						}
						value={answersError1 ? answersError1 : ''}
						disabled={remainingPoints <= 0 && true}
					/>
					<TextField
						className='textField'
						color='error'
						variant='outlined'
						label='Respuesta Incorrecta'
						size='small'
						style={{
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setAnswersError2(e.target.value)
						}
						value={answersError2 ? answersError2 : ''}
						disabled={remainingPoints <= 0 && true}
					/>
					<TextField
						className='textField'
						color='error'
						variant='outlined'
						label='Respuesta Incorrecta'
						size='small'
						style={{
							margin: '10px',
						}}
						margin='normal'
						fullWidth
						onChange={(e: any) =>
							setAnswersError3(e.target.value)
						}
						value={answersError3 ? answersError3 : ''}
						disabled={remainingPoints <= 0 && true}
					/>
				</div>
				<Button
					color='secondary'
					variant='outlined'
					size='small'
					style={{
						margin: '10px',
						height: '32px',
					}}
					startIcon={<Save />}
					type='submit'>
					{`Guardar ${
						!modeEdit ? 'examen' : 'cambios'
					}`}
				</Button>
				{modeEdit && (
					<Button
						color='warning'
						variant='outlined'
						size='small'
						style={{
							margin: '10px',
							height: '32px',
						}}
						startIcon={<Save />}
						type='button'
						onClick={() => {
							setExamSelected({} as ExamInterface);
							setValueNavigation('examenes');
							navigate('../');
						}}>
						Cancelar
					</Button>
				)}
			</form>
			<div className='preview'>
				<Typography variant='body1'>{name}</Typography>
				<ul>
					{questions.length > 0 ? (
						questions.map(
							(
								q: QuestionFormInterface,
								i: number,
							) => (
								<div
									className='containerQuestion'
									key={i}>
									<p className='question'>
										{q.question}{' '}
										<span className='points'>
											{q.points} pts {'  '}
										</span>
										<FontAwesomeIcon
											color='#8d2424'
											style={{
												cursor: 'pointer',
											}}
											icon={faTrash}
											onClick={() =>
												handleClickDeleteQuestion(
													q,
												)
											}
										/>
									</p>
									<p className='correct'>
										{q.answerCorrect}
									</p>
									{q.answersError.map(
										(e: string, i: number) => (
											<p
												className='error'
												key={i}>
												{e}
											</p>
										),
									)}
								</div>
							),
						)
					) : (
						<p>
							Agrega preguntas para ir viendo tu
							examen.
						</p>
					)}
				</ul>
			</div>
		</div>
	);
};

export default NewExam;
