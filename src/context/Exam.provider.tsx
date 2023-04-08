import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext, useState } from 'react';
import { ExamFormInterface } from '../interface/exam.interface';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	valueNavigation: string;
	setValueNavigation: (value: string) => void;
	postExam: (exam: ExamFormInterface) => void;
}

const ExamContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const ExamProvider = ({ children }: PropsInterface) => {
	const [valueNavigation, setValueNavigation] =
		useState('examenes');
	const navigate = useNavigate();
	const postExam = async (
		exam: ExamFormInterface,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				'/exam/new-exam',
				exam,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			navigate('user/exams');
			setValueNavigation('examenes');
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};
	return (
		<ExamContext.Provider
			value={{
				valueNavigation,
				setValueNavigation,
				postExam,
			}}>
			{children}
		</ExamContext.Provider>
	);
};

export { ExamProvider };

export default ExamContext;
