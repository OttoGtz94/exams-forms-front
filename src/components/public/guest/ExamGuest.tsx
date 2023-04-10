import {
	Button,
	Checkbox,
	TextField,
	Typography,
} from '@mui/material';
import React, { FormEvent, useState } from 'react';
import useGuest from '../../../hooks/useGuest';
import { useEffect } from 'react';
import { alertToastify } from '../../../helpers/index';
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
	const [mouseEnter, setMouseEnter] = useState(2);
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

	useEffect(() => {
		if (mouseEnter === 0) {
			alertToastify(
				'error',
				'Examen terminado por trampa',
			);
			if (answers.length !== questions.length) {
				for (
					let i = answers.length;
					i < questions.length;
					i++
				) {
					answers.push({} as AnswersExamInterface);
				}
				sendExam(answers);
			}
		}
	}, [flagAdd, mouseEnter]);
	return (
		<div className='examGuest'>
			{!startExam ? (
				<div className='welcome'>
					<h1>Bienvenido/a {name}</h1>
					<Typography variant='body1'>
						No podras salirte del rectangulo rojo, ya
						que al llegar al limite el examen se dara
						por concluido. El examen{' '}
						<strong>{nameExam}</strong> asignado por{' '}
						{nameUser} {firstName} cuenta con{' '}
						{questions.length} preguntas. Prinesa bien
						antes de seleccionar una respuesta, ya que
						una vez seleccionada no podras cambiarla.
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
				<>
					<p>
						{mouseEnter} oportunidades para ingresar
						el cursor al formulario. Al 0 se concluíra
						el examen.
					</p>
					<form
						className='formExamStudent'
						onSubmit={handleSubmit}
						onMouseEnter={(e: any) => {
							setMouseEnter(mouseEnter - 1);
							alertToastify(
								'warn',
								`Manten el cursor dentro de la linea roja`,
							);
						}}>
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
														question:
															q.question,
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
				</>
			)}
		</div>
	);
};

export default ExamGuest;
