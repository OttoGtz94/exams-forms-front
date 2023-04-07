import {
	AddBox,
	AddCircleOutline,
	Save,
} from '@mui/icons-material';
import {
	Button,
	IconButton,
	Slider,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { QuestionFormInterface } from '../../../interface/exam.interface';
import { alertToastify } from '../../../helpers/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import useExam from '../../../hooks/useExam';
import useAuth from '../../../hooks/useAuth';

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

	const [questions, setQuestions] = useState<
		QuestionFormInterface[]
	>([]);

	const { postExam } = useExam();
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

		postExam({
			name,
			questions,
			userId: id,
		});
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
						//defaultValue={100}
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
						//focused
						size='small'
						style={{
							//width: '350px',
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
						//focused
						size='small'
						style={{
							//width: '350px',
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
						//focused
						size='small'
						style={{
							//width: '350px',
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
						//focused
						size='small'
						style={{
							//width: '350px',
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
						//focused
						size='small'
						style={{
							//width: '350px',
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
					Guardar examen
				</Button>
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
									{/* <p className='error'>
										{q.answersError}
									</p> */}
									{/* <p className='error'>
										{q.answersError2}
									</p>
									<p className='error'>
										{q.answersError3}
									</p> */}
								</div>
							),
						)
					) : (
						<p>
							Agrega preguntas para ir viendo tu
							examen.
						</p>
					)}
					{/* <div className='containerQuestion'>
						<p className='question'>
							Pregunta 1{' '}
							<FontAwesomeIcon
								color='#8d2424'
								style={{ cursor: 'pointer' }}
								icon={faTrash}
							/>
						</p>
						<p className='correct'>
							respuesta correcta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
					</div> */}
					{/* <div className='containerQuestion'>
						<p className='question'>Pregunta 2</p>
						<p className='correct'>
							respuesta correcta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
					</div>
					<div className='containerQuestion'>
						<p className='question'>Pregunta 3</p>
						<p className='correct'>
							respuesta correcta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
						<p className='error'>
							respuesta incorrecta
						</p>
					</div> */}
				</ul>
			</div>
		</div>
	);
};

export default NewExam;
