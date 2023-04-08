import { useContext } from 'react';
import StudentContext from '../context/Student.provider';

const useStudent = () => {
	return useContext(StudentContext);
};

export default useStudent;
