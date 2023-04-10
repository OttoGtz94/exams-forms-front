import { Typography } from '@mui/material';
import React, { useState } from 'react';
import useExam from '../../../hooks/useExam';
import { useEffect } from 'react';
import { StudentExamAnsweredInterface } from '../../../interface/exam.interface';
import ExamAnswered from './ExamAnswered';
import DialogExamAnswered from '../../Layout/DialogExamAnswered';

const ExamsAnswered = () => {
	const [open, setOpen] = useState(false);
	const [examSelected, setExamSelected] =
		useState<StudentExamAnsweredInterface>(
			{} as StudentExamAnsweredInterface,
		);
	const { getExamsAnswered, examsAnswered, markExam } =
		useExam();

	const handleClickMarkExam = (id: string) => {
		console.log(id);
		markExam(id);
		setOpen(false);
	};

	const handleClickExam = (
		exam: StudentExamAnsweredInterface,
	) => {
		setExamSelected(exam);
		setOpen(true);
	};

	useEffect(() => {
		getExamsAnswered();
	}, []);
	return (
		<>
			<div className='container'>
				<Typography variant='h5'>
					Examenes Resueltos
				</Typography>

				<div className='exams'>
					{examsAnswered.length > 0 ? (
						examsAnswered.map(
							(
								exam: StudentExamAnsweredInterface,
							) => (
								<ExamAnswered
									exam={exam}
									handleClickExam={handleClickExam}
									key={`${exam._id}-${exam.examAnswereds._id}`}
								/>
							),
						)
					) : (
						<p>No hay examenes asignados</p>
					)}
				</div>
			</div>
			{open && (
				<DialogExamAnswered
					open={open}
					setOpen={setOpen}
					exam={examSelected}
					handleClickMarkExam={handleClickMarkExam}
				/>
			)}
		</>
	);
};

export default ExamsAnswered;
