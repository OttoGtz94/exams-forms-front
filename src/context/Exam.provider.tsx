import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { createContext, useState } from 'react';
import {
	ExamFormInterface,
	ExamInterface,
} from '../interface/exam.interface';
import { alertToastify } from '../helpers/index';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { StudentExamAnsweredInterface } from '../interface/exam.interface';
import {
	StudentExamAssignedInterface,
	ExamAssignedInterface,
} from '../interface/exam.interface';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	valueNavigation: string;
	exams: ExamInterface[];
	requestExams: boolean;
	examsAsigned: StudentExamAssignedInterface[];
	examSelected: ExamInterface;
	examsAnswered: StudentExamAnsweredInterface[];
	setValueNavigation: (value: string) => void;
	setExamSelected: (exam: ExamInterface) => void;
	setExamsAnswered: (
		exam: StudentExamAnsweredInterface[],
	) => void;
	postExam: (exam: ExamFormInterface) => void;
	getExams: () => void;
	getExamsAssigned: () => void;
	editExam: (exam: ExamFormInterface) => void;
	getExamsAnswered: () => void;
	markExam: (id: string) => void;
}

const ExamContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const ExamProvider = ({ children }: PropsInterface) => {
	const [valueNavigation, setValueNavigation] =
		useState('examenes');

	const [exams, setExams] = useState<ExamInterface[]>(
		[] as ExamInterface[],
	);
	const [requestExams, setRequestExams] = useState(false);
	const [examsAsigned, setExamsAsigned] = useState<
		StudentExamAssignedInterface[]
	>([] as StudentExamAssignedInterface[]);
	const [examSelected, setExamSelected] =
		useState<ExamInterface>({} as ExamInterface);
	const [examsAnswered, setExamsAnswered] = useState<
		StudentExamAnsweredInterface[]
	>([] as StudentExamAnsweredInterface[]);

	const {
		userInfo: { id },
	} = useAuth();
	const navigate = useNavigate();

	const markExam = async (
		id: string,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				'/exam/mark-exam',
				{ id },
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);

			return {} as AxiosResponse;
		} catch (error) {
			return {} as AxiosError;
		}
	};

	const getExamsAnswered = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		try {
			const { data } = await axios.get(
				`/exam/get-exams-answered/${id}`,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			setExamsAnswered(data.studentExamAnswered);
			return {} as AxiosResponse;
		} catch (error) {
			return {} as AxiosError;
		}
	};

	const editExam = async (
		exam: ExamFormInterface,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.put(
				`/exam/update-exam/${examSelected._id}`,
				exam,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			alertToastify('success', data.msg);
			setExamSelected({} as ExamInterface);
			setValueNavigation('examenes');

			navigate('user/exams');
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

	const getExamsAssigned = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		try {
			const { data } = await axios.get(
				`/exam//get-exams-assigned/${id}`,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			const studentsExam: StudentExamAssignedInterface[] =
				[];
			data.estudianteExamenesAsignados.map(
				(i: StudentExamAssignedInterface) => {
					const obj: StudentExamAssignedInterface =
						{} as StudentExamAssignedInterface;
					obj._id = i._id;
					obj.name = i.name;
					obj.timeZone = i.timeZone;
					obj.examenesAsig = {
						clave: i.examenesAsig.clave,
						dateAssigned: i.examenesAsig.dateAssigned,
						dateLimit: i.examenesAsig.dateLimit,
						examen: {
							_id: i.examenesAsig.examen._id,
							name: i.examenesAsig.examen.name,
							userId: i.examenesAsig.examen.userId,
							date: i.examenesAsig.examen.date,
							questions: [],
						},
					};
					studentsExam.push(obj);
				},
			);
			setExamsAsigned(studentsExam);

			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

	const getExams = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		try {
			const { data } = await axios.get(
				`/exam/get-exams/${id}`,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}
			setExams(data.exams);
			setRequestExams(true);
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

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
				requestExams,
				exams,
				examsAsigned,
				examSelected,
				examsAnswered,
				setValueNavigation,
				setExamSelected,
				setExamsAnswered,
				postExam,
				getExams,
				getExamsAssigned,
				editExam,
				getExamsAnswered,
				markExam,
			}}>
			{children}
		</ExamContext.Provider>
	);
};

export { ExamProvider };

export default ExamContext;
