export interface QuestionFormInterface {
	_id?: string;
	question: string;
	answerCorrect: string;
	answersError: string[];
	points: number;
}

export interface ExamFormInterface {
	name: string;
	questions: QuestionFormInterface[];
	userId: string;
}

export interface ExamInterface {
	_id: string;
	date: Date;
	name: string;
	questions: QuestionFormInterface[];
	userId: string;
}
export interface ExamPropsInterface {
	exam: ExamInterface;
	showActions?: boolean;
	onClick?: (exam: ExamInterface) => void;
}

export interface ExamAssignedPropsInterface {
	exam: StudentExamAssignedInterface;
}

export interface StudentExamAssignedInterface {
	name: string;
	timeZone: string;
	_id: string;
	examenesAsig: ExamAssignedInterface;
}

export interface ExamAssignedInterface {
	clave: string;
	dateAssigned: Date;
	dateLimit: Date;
	examen: ExamInterface;
}

export interface StudentExamAnsweredInterface {
	_id: string;
	age: number;
	name: string;
	timeZone: string;
	examAnswereds: ExamAnsweredInterface;
}

export interface ExamAnsweredInterface {
	date: Date;
	reviewed: boolean;
	score: number;
	studentAnswers: StudentAnswersInterface[];
	_id: string;
	exam: ExamFromAnswered;
}

export interface StudentAnswersInterface {
	answer: string;
	question: string;
	_id: string;
}

export interface ExamFromAnswered {
	name: string;
	_id: string;
	questions: QuestionFormInterface[];
}

export interface ExamAnsweredProps {
	exam: StudentExamAnsweredInterface;
	handleClickExam: (
		exam: StudentExamAnsweredInterface,
	) => void;
}
