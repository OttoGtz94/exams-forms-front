/* import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/system'; */
import {
	createTheme,
	CssBaseline,
	ThemeProvider,
} from '@mui/material';
import React from 'react';
interface PropsInterface {
	children: JSX.Element | JSX.Element[];
}

const MuiThemeProvider: React.FC<PropsInterface> = ({
	children,
}: PropsInterface) => {
	const theme = createTheme({
		palette: {
			primary: {
				main: '#c51f5d',
				dark: '#891541',
				light: '#ca356d',
				contrastText: '#fff',
			},
			secondary: {
				main: '#1fc587',
				light: '#35ca93',
				dark: '#15895e',
				contrastText: '#fff',
			},
			error: {
				main: '#810c0c',
				dark: '#5a0808',
				light: '#8d2424',
				contrastText: '#fff',
			},
			warning: {
				main: '#a54a00',
				contrastText: '#fff',
			},
			background: {
				paper: '#29313a',
				default: '#141d26',
				//default: '#243447',
			},
			mode: 'dark',
		},
	});
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};

export default MuiThemeProvider;
