import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext, useState } from 'react';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';
import { StudentFormInterface } from '../interface/student.interface';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	valueNavigation: string;
	setValueNavigation: (value: string) => void;
	postStudent: (student: StudentFormInterface) => void;
}

const StudentContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const StudentProvider = ({ children }: PropsInterface) => {
	const [valueNavigation, setValueNavigation] =
		useState('estudiantes');
	const navigate = useNavigate();

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
				setValueNavigation,
				postStudent,
			}}>
			{children}
		</StudentContext.Provider>
	);
};

export { StudentProvider };

export default StudentContext;
