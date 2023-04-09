export interface QuestionFormInterface {
	_id?: string;
	question: string;
	answerCorrect: string;
	answersError: string[];
	/* answersError1: string;
	answersError2: string;
	answersError3: string; */
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
