import React from 'react';
import './App.css';
import SignUp from './SignUp';
import { Container } from '@mui/material';

function App() {
    return (
        <div className="App">
            <Container maxWidth="sm">
                <SignUp />
            </Container>
        </div>
    );
}

export default App;
