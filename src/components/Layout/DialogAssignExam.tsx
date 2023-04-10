import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import React, { useState } from 'react';
import useExam from '../../hooks/useExam';
import { DialogExamFormInterface } from '../../interface/dialog.exam.interface';
import { ExamInterface } from '../../interface/exam.interface';
import Exam from '../private/exams/Exam';
import { useEffect } from 'react';
import {
	DateTimePicker,
	LocalizationProvider,
	TimePicker,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
	DemoContainer,
	DemoItem,
} from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement<any, any>;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

const fiveAM = dayjs().set('hour', 5).startOf('hour');
const nineAM = dayjs().set('hour', 9).startOf('hour');

const DialogAssignExam = ({
	open,
	setOpen,
	examIdSelected,
	dateLimit,
	setExamIdSelected,
	setDateLimit,
	handleAssign,
}: DialogExamFormInterface) => {
	const { exams, requestExams, getExams } = useExam();

	useEffect(() => {
		if (!requestExams) {
			getExams();
		}
	}, []);
	return (
		<Dialog
			open={open}
			TransitionComponent={Transition}
			keepMounted
			onClose={() => setOpen(false)}
			fullWidth>
			<DialogTitle>Selecciona examen</DialogTitle>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<DemoContainer
					components={[
						'TimePicker',
						'DateTimePicker',
					]}>
					<DemoItem label='Fecha maxima de examen'>
						<DateTimePicker
							ampm={false}
							defaultValue={nineAM}
							maxTime={fiveAM}
							onChange={(e: any, context: any) => {
								const fecha: any =
									Object.entries(e)[2][1];
								setDateLimit(fecha);
							}}
						/>
					</DemoItem>
				</DemoContainer>
			</LocalizationProvider>
			<DialogContent
				sx={{ display: 'flex', flexWrap: 'wrap' }}>
				{exams.length > 0
					? exams.map((exam: ExamInterface) => (
							<div
								style={{
									margin: '5px',
									display: 'flex',
									flexWrap: 'wrap',
									cursor: 'pointer',
									border:
										exam._id === examIdSelected
											? '3px solid #35ca93'
											: '3px solid transparent',
								}}
								onClick={() => {
									if (
										examIdSelected === exam._id
									) {
										setExamIdSelected('');
									} else {
										setExamIdSelected(exam._id);
									}
								}}
								key={exam._id}>
								<Exam
									exam={exam}
									showActions={false}
								/>
							</div>
					  ))
					: null}
			</DialogContent>
			<DialogActions>
				{examIdSelected !== '' &&
					dateLimit.toString().length > 15 && (
						<Button
							color='secondary'
							variant='contained'
							onClick={() => {
								handleAssign();
								setOpen(false);
							}}>
							Asignar
						</Button>
					)}
				<Button
					color='warning'
					variant='contained'
					onClick={() => {
						setExamIdSelected('');
						setOpen(false);
						setDateLimit({} as Date);
					}}>
					Cancelar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogAssignExam;
