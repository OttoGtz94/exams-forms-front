import { useContext } from 'react';
import ExamContext from '../context/Exam.provider';

const useExam = () => {
	return useContext(ExamContext);
};

export default useExam;
