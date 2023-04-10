import {
	Button,
	Checkbox,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import useGuest from '../../../hooks/useGuest';
import { useEffect } from 'react';
import {
	QuestionForStudentInterface,
	AnswersExamInterface,
} from '../../../interface/guest.interface';

const ExamGuest = () => {
	const [startExam, setStartExam] = useState(false);
	const [answers, setAnswers] = useState<
		AnswersExamInterface[]
	>([]);
	const [flagAdd, setFlagAdd] = useState(false);
	const [answersStrings, setAnswersStrings] = useState<
		string[]
	>([]);
	const {
		forStudent: {
			name,
			exam: { nameExam, questions },
			user: { nameUser, firstName },
		},
		sendExam,
	} = useGuest();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		sendExam(answers);
	};

	const handleClickAnswer = (
		answer: AnswersExamInterface,
	) => {
		const existQ = answers.find(
			(an: AnswersExamInterface) =>
				an.question === answer.question,
		);
		if (!existQ) {
			answers.push(answer);
			setFlagAdd(!flagAdd);
			setTimeout(() => {
				setFlagAdd(!flagAdd);
			}, 200);
		}
	};

	const showAnswerSelected = (answer: string): boolean => {
		const a = answers.find(
			(an: AnswersExamInterface) => an.answer === answer,
		);
		if (a) {
			return true;
		} else {
			return false;
		}
	};

	useEffect(() => {}, [flagAdd]);
	return (
		<div className='examGuest'>
			<button
				onClick={() => {
					//setAnswersStrings([]);
					setAnswers([]);
				}}>
				limpiararr
			</button>
			{!startExam ? (
				<div className='welcome'>
					<h1>Bienvenido/a {name}</h1>
					<Typography variant='body1'>
						Una vez iniciado no podras salirte, si no
						el examen se dara por concluido, al igual
						si te sales del rectangulo rojo al iniciar
						el examen. El examen{' '}
						<strong>{nameExam}</strong> asignado por{' '}
						{nameUser} {firstName} cuenta con{' '}
						{questions.length} preguntas.
					</Typography>
					<Button
						color='primary'
						variant='contained'
						onClick={() => setStartExam(true)}
						style={{
							margin: '10px auto',
						}}>
						Iniciar Examen
					</Button>
				</div>
			) : (
				<form
					className='formExamStudent'
					onSubmit={handleSubmit}>
					{questions.map(
						(
							q: QuestionForStudentInterface,
							index: number,
						) => (
							<div
								key={index + 1}
								className='question'>
								<Typography
									variant='body1'
									color='secondary'>
									{index + 1} {q.question} (
									{q.points}pts)
								</Typography>
								{q.answers.map(
									(a: string, i: number) => (
										<div
											key={i + 1}
											onClick={() => {
												handleClickAnswer({
													question: q.question,
													answer: a,
													id: i + 1,
												});
											}}
											className={`answer ${
												showAnswerSelected(a)
													? 'answerSelected'
													: ''
											}`}>
											<TextField
												className='textField'
												variant='outlined'
												value={a}
												focused
												fullWidth
												/* style={{
													width: 400,
												}} */
											/>
										</div>
									),
								)}
							</div>
						),
					)}
					<Button
						variant='outlined'
						color='primary'
						fullWidth
						type='submit'>
						Enviar
					</Button>
				</form>
			)}
		</div>
	);
};

export default ExamGuest;
