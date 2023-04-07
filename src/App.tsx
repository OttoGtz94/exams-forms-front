import { Button } from '@mui/material';
import {
	BrowserRouter,
	Route,
	Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AuthLayout from './components/Layout/AuthLayout';
import Home from './components/public/Home';
import Login from './components/public/Login';
import Register from './components/public/Register';
import { AuthProvider } from './context/Auth.provider';
import MuiThemeProvider from './theme';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/private/Dashboard';
import Private from './components/private/Private';
import Error404 from './components/public/Error404';
import Exams from './components/private/exams/Exams';
import MainExam from './components/private/exams/MainExam';
import NewExam from './components/private/exams/NewExam';
import ExamAssigneds from './components/private/exams/ExamAssigneds';
import ExamAnswered from './components/private/exams/ExamAnswered';
import { ExamProvider } from './context/Exam.provider';

function App() {
	return (
		<>
			<div className='App'>
				<ToastContainer
					position='top-right'
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme='dark'
				/>
				<MuiThemeProvider>
					<BrowserRouter>
						<AuthProvider>
							<ExamProvider>
								<Routes>
									<Route
										path='/'
										element={<Home />}>
										<Route
											path='/login'
											element={<Login />}
										/>
										<Route
											path='register'
											element={<Register />}
										/>
										<Route
											path='*'
											element={<Error404 />}
										/>
									</Route>
									<Route
										path='/user'
										element={<Private />}>
										<Route
											index
											element={<Dashboard />}
										/>
										<Route
											path='exams'
											element={<MainExam />}>
											<Route
												index
												element={<Exams />}
											/>
											<Route
												path='add-exam'
												element={<NewExam />}
											/>
											<Route
												path='assigneds'
												element={
													<ExamAssigneds />
												}
											/>
											<Route
												path='answered'
												element={
													<ExamAnswered />
												}
											/>
										</Route>
										<Route
											path='*'
											element={<Error404 />}
										/>
									</Route>
								</Routes>
							</ExamProvider>
						</AuthProvider>
					</BrowserRouter>
				</MuiThemeProvider>
			</div>
		</>
	);
}

export default App;
