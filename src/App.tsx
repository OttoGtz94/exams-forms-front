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
import ExamsAssigned from './components/private/exams/ExamsAssigned';
import ExamsAnswered from './components/private/exams/ExamsAnswered';
import { ExamProvider } from './context/Exam.provider';
import MainStudent from './components/private/students/MainStudent';
import Students from './components/private/students/Students';
import NewStudent from './components/private/students/NewStudent';
import { StudentProvider } from './context/Student.provider';
import { GuestProvider } from './context/Guest.provider';
import GuestStudent from './components/public/guest/GuestStudent';
import FormClave from './components/public/guest/FormClave';
import ExamGuest from './components/public/guest/ExamGuest';

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
								<StudentProvider>
									<GuestProvider>
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
													element={
														<Register />
													}
												/>
											</Route>
											<Route
												path='guest-student'
												element={
													<GuestStudent />
												}>
												<Route
													index
													element={
														<FormClave />
													}
												/>

												<Route
													path='exam'
													element={
														<ExamGuest />
													}
												/>
											</Route>
											<Route
												path='/user'
												element={<Private />}>
												<Route
													index
													element={
														<Dashboard />
													}
												/>
												<Route
													path='exams'
													element={
														<MainExam />
													}>
													<Route
														index
														element={
															<Exams />
														}
													/>
													<Route
														path='add-exam'
														element={
															<NewExam />
														}
													/>
													<Route
														path='assigneds'
														element={
															<ExamsAssigned />
														}
													/>
													<Route
														path='answered'
														element={
															<ExamsAnswered />
														}
													/>
												</Route>
												<Route
													path='students'
													element={
														<MainStudent />
													}>
													<Route
														index
														element={
															<Students />
														}
													/>
													<Route
														path='add-student'
														element={
															<NewStudent />
														}
													/>
												</Route>
												<Route
													path='*'
													element={
														<Error404 />
													}
												/>
											</Route>
										</Routes>
									</GuestProvider>
								</StudentProvider>
							</ExamProvider>
						</AuthProvider>
					</BrowserRouter>
				</MuiThemeProvider>
			</div>
		</>
	);
}

export default App;
