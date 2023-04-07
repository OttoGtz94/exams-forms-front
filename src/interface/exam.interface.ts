export interface QuestionFormInterface {
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
