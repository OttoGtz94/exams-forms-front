import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext, useState } from 'react';
import {
	ResForStudentInterface,
	AnswersExamInterface,
} from '../interface/guest.interface';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	searchKey: (key: string) => void;
	forStudent: ResForStudentInterface;
	sendExam: (exam: AnswersExamInterface[]) => void;
}

const GuestContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const GuestProvider = ({ children }: PropsInterface) => {
	const [forStudent, setForStudent] =
		useState<ResForStudentInterface>(
			{} as ResForStudentInterface,
		);

	const navigate = useNavigate();

	const sendExam = async (
		exam: AnswersExamInterface[],
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				`/exam/mark-exam/${forStudent.exam.idAssigned}`,
				{ exam },
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			setForStudent({} as ResForStudentInterface);
			navigate('/');
			return {} as AxiosResponse;
		} catch (error) {
			return {} as AxiosError;
		}
	};

	const searchKey = async (
		key: string,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.get(
				`/exam/get-exam-key/${key}`,
			);

			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			setForStudent(data.forStudent);
			navigate('guest-student/exam');

			return {} as AxiosResponse;
		} catch (error) {
			return {} as AxiosError;
		}
	};
	return (
		<GuestContext.Provider
			value={{ searchKey, forStudent, sendExam }}>
			{children}
		</GuestContext.Provider>
	);
};

export { GuestProvider };

export default GuestContext;
