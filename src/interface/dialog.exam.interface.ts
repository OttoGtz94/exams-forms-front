import {
	ExamInterface,
	StudentExamAnsweredInterface,
} from './exam.interface';
export interface DialogExamFormInterface {
	open: boolean;
	examIdSelected: string;
	dateLimit: Date;
	setDateLimit: (fecha: Date) => void;
	setOpen: (flag: boolean) => void;
	setExamIdSelected: (id: string) => void;
	handleAssign: () => void;
}

export interface DialogExamInterface {
	open: boolean;
	setOpen: (flag: boolean) => void;
	examSelected: ExamInterface;
}

export interface DialogExamAnsweredInterface {
	open: boolean;
	setOpen: (flag: boolean) => void;
	exam: StudentExamAnsweredInterface;
	handleClickMarkExam: (id: string) => void;
}
