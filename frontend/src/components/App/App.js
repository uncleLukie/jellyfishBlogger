import React from 'react';
import './App.css';
import HomePage from '../HomePage/HomePage';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <div className="App">
                    <HomePage />
                </div>
            </ThemeProvider>
        </Router>
    );
}

export default App;
