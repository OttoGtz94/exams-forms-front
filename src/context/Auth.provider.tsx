import { createContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { alertToastify } from '../helpers/index';
import {
	CredentialsRegisterInterface,
	CredentialsLoginInterface,
	CountInterface,
} from '../interface/auth.interface';
import axios from '../utils/axios';
import { AxiosResponse, AxiosError } from 'axios';
import { UserInfoInterface } from '../interface/auth.interface';
import useExam from '../hooks/useExam';

interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

interface StateInitialInterface {
	countInfo: CountInterface;
	userInfo: UserInfoInterface;
	register: (
		credentials: CredentialsRegisterInterface,
	) => void;
	login: (crendential: CredentialsLoginInterface) => void;
	hasToken: () => void;
	getInfoDashboard: () => void;
	logout: () => void;
}

const AuthContext = createContext<StateInitialInterface>(
	{} as StateInitialInterface,
);

const AuthProvider = ({ children }: PropsInterface) => {
	const [userInfo, setUserInfo] =
		useState<UserInfoInterface>({} as UserInfoInterface);
	const [countInfo, setCountInfo] =
		useState<CountInterface>({} as CountInterface);
	const navigate = useNavigate();
	const location = useLocation();

	const getInfoDashboard = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		try {
			const { data } = await axios.post('/user/count', {
				_id: userInfo.id,
			});
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosResponse;
			}

			setCountInfo(data.info);
			return data as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

	const logout = () => {
		setUserInfo({} as UserInfoInterface);
		setCountInfo({} as CountInterface);
		localStorage.removeItem('token');
		navigate('/');
	};

	const hasToken = async (): Promise<
		AxiosResponse | AxiosError
	> => {
		const token = localStorage.getItem('token');
		try {
			if (token) {
				const { data } = await axios.post(
					'/user/verify-token',
					{ token },
				);
				if (data.status === 400) {
					alertToastify('error', data.msg);
					localStorage.removeItem('token');
					if (localStorage.getItem('auth')) {
						localStorage.removeItem('auth');
					}
					navigate('/');
					return {} as AxiosResponse;
				} else {
					alertToastify('success', data.msg);
					setUserInfo({
						id: data.userInfo.id,
						name: data.userInfo.name,
						firstName: data.userInfo.firstName,
						email: data.userInfo.email,
						auth: true,
					});
					navigate('/user');
					return {} as AxiosResponse;
				}
			} else {
				if (location.pathname === '/') {
					return {} as AxiosResponse;
				}
				alertToastify('error', 'No existe token');
				if (localStorage.getItem('auth')) {
					localStorage.removeItem('auth');
				}
				navigate('/');
				return {} as AxiosResponse;
			}
		} catch (error) {
			return error as AxiosError;
		}
	};

	const login = async (
		credentials: CredentialsLoginInterface,
	): Promise<AxiosResponse | AxiosError> => {
		try {
			const { data } = await axios.post(
				'/user/login',
				credentials,
			);
			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return {} as AxiosError;
			}

			alertToastify('success', data.msg);
			localStorage.setItem('token', data.token);
			navigate('/user');
			return {} as AxiosResponse;
		} catch (error) {
			return error as AxiosError;
		}
	};

	const register = async (
		credentials: CredentialsRegisterInterface,
	) => {
		try {
			const { data } = await axios.post(
				'/user/new-user',
				credentials,
			);

			if (data.status !== 200) {
				alertToastify('error', data.msg);
				return;
			}

			alertToastify('success', data.msg);

			navigate('/login');
		} catch (error) {
			alertToastify(
				'error',
				'Hubo un error al registrarse.',
			);
		}
	};
	return (
		<AuthContext.Provider
			value={{
				register,
				login,
				hasToken,
				getInfoDashboard,
				countInfo,
				userInfo,
				logout,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
