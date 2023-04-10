import React from 'react';
import useExam from '../../../hooks/useExam';
import { useEffect } from 'react';
import { StudentExamAssignedInterface } from '../../../interface/exam.interface';
import { Typography } from '@mui/material';
import ExamAssigned from './ExamAssigned';

const ExamAssigneds = () => {
	const { getExamsAssigned, examsAsigned } = useExam();

	useEffect(() => {
		getExamsAssigned();
	}, []);
	return (
		<div className='container'>
			<Typography variant='h5'>
				Examenes Asignados
			</Typography>

			<div className='exams'>
				{examsAsigned.length > 0 ? (
					examsAsigned.map(
						(exam: StudentExamAssignedInterface) => (
							<ExamAssigned
								key={exam.examenesAsig.clave}
								exam={exam}
							/>
						),
					)
				) : (
					<p>No hay asignados</p>
				)}
			</div>
		</div>
	);
};

export default ExamAssigneds;
