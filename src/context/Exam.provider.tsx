import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext } from 'react';
import { ExamFormInterface } from '../interface/exam.interface';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	postExam: (exam: ExamFormInterface) => void;
}

const ExamContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const ExamProvider = ({ children }: PropsInterface) => {
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

			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};
	return (
		<ExamContext.Provider value={{ postExam }}>
			{children}
		</ExamContext.Provider>
	);
};

export { ExamProvider };

export default ExamContext;
