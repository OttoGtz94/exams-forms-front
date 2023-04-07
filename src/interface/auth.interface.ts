export interface CredentialsRegisterInterface {
	name: string;
	firstName: string;
	email: string;
	password: string;
}

export interface CredentialsLoginInterface {
	email: string;
	password: string;
}

export interface UserInfoInterface {
	email: string;
	exp?: number;
	firstName: string;
	iat?: number;
	id: string;
	name: string;
	auth: boolean;
}

export interface CountInterface {
	countExams: number;
	countExamsAnswered: number;
	countExamsAssigned: number;
	countStudents: number;
}
