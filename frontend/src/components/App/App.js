import React from 'react';
import './App.css';
import HomePage from '../HomePage/HomePage';
import CreatePost from '../CreatePost/CreatePost';
import theme from '../../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from '../UserContext/UserContext';

function App() {
    return (
        <UserProvider>
            <Router>
                <ThemeProvider theme={theme}>
                    <div className="App">
                        <Routes>
                            <Route path="/createpost" element={<CreatePost />} />
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </div>
                </ThemeProvider>
            </Router>
        </UserProvider>
    );
}

export default App;
