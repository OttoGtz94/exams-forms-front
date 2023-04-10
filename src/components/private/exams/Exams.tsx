import React, { useState } from 'react';
import useExam from '../../../hooks/useExam';
import { useEffect } from 'react';
import { ExamInterface } from '../../../interface/exam.interface';
import Exam from './Exam';
import DialogExam from '../../Layout/DialogExam';
import { Typography } from '@mui/material';

const Exams = () => {
	const [open, setOpen] = useState(false);

	const {
		exams,
		getExams,
		examSelected,
		setExamSelected,
	} = useExam();

	const hanleClickSelectedExam = (exam: ExamInterface) => {
		setExamSelected(exam);
		setOpen(true);
	};

	useEffect(() => {
		getExams();
	}, []);
	return (
		<>
			<div className='container'>
				<Typography variant='h5'>Examenes</Typography>
				<div className='exams'>
					{exams.length > 0 ? (
						exams.map((exam: ExamInterface) => (
							<Exam
								exam={exam}
								key={exam._id}
								onClick={hanleClickSelectedExam}
							/>
						))
					) : (
						<p>No Hay examenes</p>
					)}
				</div>
			</div>
			{open && (
				<DialogExam
					setOpen={setOpen}
					open={open}
					examSelected={examSelected}
				/>
			)}
		</>
	);
};

export default Exams;
