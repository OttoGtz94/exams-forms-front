export interface ResForStudentInterface {
	_id: string;
	name: string;
	timeZone: string;
	user: {
		email: string;
		firstName: string;
		nameUser: string;
	};
	exam: {
		nameExam: string;
		clave: string;
		dateAssigned: string;
		dateLimit: string;
		idAssigned: string;
		questions: QuestionForStudentInterface[];
	};
}

export interface QuestionForStudentInterface {
	question: string;
	answers: string[];
	points: number;
}

export interface FormExamGuestInterface {
	nameExam: string;
	questions: QuestionForStudentInterface[];
}

export interface AnswersExamInterface {
	id: number;
	question: string;
	answer: string;
}
