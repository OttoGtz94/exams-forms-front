export interface StudentFormInterface {
	name: string;
	age: number;
	city: string;
	timeZone: string;
	curp: string;
	userId: string;
}

export interface StudentInterface {
	_id: string;
	name: string;
	city: string;
	curp: string;
	date: Date;
	timeZone: String;
	userId: string;
	examsAnsweredId: any[];
	examsAssignedId: any[];
	examsAnsweredCount?: number;
	examsAssignedCount?: number;
}

export interface StudentExamAssigned {
	dateLimit: Date;
	userId: string;
	studentId: string;
	examId: string;
	clave: string;
}
