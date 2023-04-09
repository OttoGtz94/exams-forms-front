import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext, useState } from 'react';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';
import {
	StudentFormInterface,
	StudentInterface,
} from '../interface/student.interface';
import useAuth from '../hooks/useAuth';
import { StudentExamAssigned } from '../interface/student.interface';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	valueNavigation: string;
	students: StudentInterface[];
	setValueNavigation: (value: string) => void;
	postStudent: (student: StudentFormInterface) => void;
	getStudents: () => void;
	assignExam: (assign: StudentExamAssigned) => void;
}

const StudentContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const StudentProvider = ({ children }: PropsInterface) => {
	const [valueNavigation, setValueNavigation] =
		useState('estudiantes');
	const [students, setStudents] = useState<
		StudentInterface[]
	>([]);
	const {
		userInfo: { id },
	} = useAuth();
	const navigate = useNavigate();

	const assignExam = async (
		assign: StudentExamAssigned,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				'/exam/assign-exam',
				assign,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			navigate('user/exams');
			return {} as AxiosResponse;
		} catch (error) {
			return {} as AxiosError;
		}
	};

	const getStudents = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		try {
			const { data } = await axios.get(
				`/student/get-students/${id}`,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			data.students.forEach(
				(student: StudentInterface) => {
					{
						student.examsAnsweredCount =
							student.examsAnsweredId.length;
						student.examsAssignedCount =
							student.examsAssignedId.length;
					}
				},
			);
			setStudents(data.students);
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

	const postStudent = async (
		student: StudentFormInterface,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				'/student/new-student',
				student,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			navigate('user/students');
			setValueNavigation('estudiantes');
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};
	return (
		<StudentContext.Provider
			value={{
				valueNavigation,
				students,
				setValueNavigation,
				postStudent,
				getStudents,
				assignExam,
			}}>
			{children}
		</StudentContext.Provider>
	);
};

export { StudentProvider };

export default StudentContext;
