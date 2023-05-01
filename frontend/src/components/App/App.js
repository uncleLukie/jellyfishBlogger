import React from 'react';
import './App.css';
import SignUp from '../SignUp/SignUp';
import theme from '../../theme/theme';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';


function App() {
    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <Container maxWidth="sm">
                    <SignUp />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
