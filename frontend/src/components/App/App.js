import React from 'react';
import './App.css';
import SignUp from '../SignUp/SignUp';
import HomePage from '../HomePage/HomePage';
import theme from '../../theme/theme';
import { Container } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <HomePage />
                    <Container maxWidth="sm">
                        <SignUp />
                    </Container>
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
