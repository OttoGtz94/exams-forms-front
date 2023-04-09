import { Delete, Edit } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useState } from 'react';
import { useEffect } from 'react';
import useStudent from '../../../hooks/useStudent';
import DialogAssignExam from '../../Layout/DialogAssignExam';
import useAuth from '../../../hooks/useAuth';

const colums: GridColDef[] = [
	/* {
		field: '_id',
		headerName: 'ID',
		hideable: false,
	}, */
	{
		field: 'name',
		headerName: 'Nombre',
		width: 200,
	},
	{ field: 'age', headerName: 'Edad', width: 50 },
	{
		field: 'curp',
		headerName: 'Curp',
		width: 250,
	},
	{
		field: 'city',
		headerName: 'City',
		width: 150,
	},
	{
		field: 'examsAssignedCount',
		headerName: 'Asignados',
		width: 100,
	},
	{
		field: 'examsAnsweredCount',
		headerName: 'Respondidos',
		width: 100,
	},
];

const Students = () => {
	const [open, setOpen] = useState(false);
	const [studentsSelected, setStudentsSelected] = useState<
		string[]
	>([]);
	const [examIdSelected, setExamIdSelected] = useState('');
	const [dateLimit, setDateLimit] = useState<Date>(
		{} as Date,
	);

	const { students, getStudents, assignExam } =
		useStudent();
	const {
		userInfo: { id },
	} = useAuth();

	const selectdStudent = (e: any) => {
		setStudentsSelected(e);
	};

	const handleAssign = () => {
		studentsSelected.forEach((studentId: string) => {
			const time = new Date().getTime().toString();
			const clave = `${time.slice(
				time.length - 3,
			)}-${id.slice(
				id.length - 3,
			)}-${examIdSelected.slice(
				examIdSelected.length - 3,
			)}-${studentId.slice(
				studentId.length - 4,
			)}-${time.slice(time.length - 3)}`.toUpperCase();
			assignExam({
				dateLimit,
				userId: id,
				studentId,
				examId: examIdSelected,
				clave,
			});
		});
	};

	useEffect(() => {
		getStudents();
	}, []);
	return (
		<div className='container'>
			<Typography variant='h5'>Estudiantes</Typography>
			<div className='students'>
				{students.length > 0 ? (
					<>
						<div
							style={{ height: 400, width: '950px' }}
							className='containerTable'>
							<DataGrid
								autoHeight
								getRowId={row => row._id}
								rows={students}
								columns={colums}
								pageSizeOptions={[5]}
								checkboxSelection
								initialState={{
									pagination: {
										paginationModel: {
											pageSize: 5,
										},
									},
								}}
								onRowSelectionModelChange={
									selectdStudent
								}
							/>
							{studentsSelected.length > 0 && (
								<>
									<Button
										color='secondary'
										variant='text'
										sx={{
											marginTop: '10px',
											marginRight: '10px',
											width: '200px',
										}}
										endIcon={<Edit />}
										onClick={() => setOpen(true)}>
										Asignar Examen
									</Button>
									<Button
										color='warning'
										variant='text'
										sx={{
											marginTop: '10px',
											width: '100px',
										}}
										endIcon={<Delete />}>
										Eliminar
									</Button>
								</>
							)}
						</div>
					</>
				) : (
					<p>No hay estudiantes</p>
				)}
			</div>
			<DialogAssignExam
				open={open}
				setOpen={setOpen}
				examIdSelected={examIdSelected}
				setExamIdSelected={setExamIdSelected}
				handleAssign={handleAssign}
				setDateLimit={setDateLimit}
				dateLimit={dateLimit}
			/>
		</div>
	);
};

export default Students;
