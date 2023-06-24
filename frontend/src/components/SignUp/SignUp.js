import React, { useState } from 'react';
import { auth, createUserWithEmailAndPassword  } from '../../firebase/firebase';
import { Button, Container, TextField, Typography, Box } from '@mui/material';
import './SignUp.css';

const SignUp = ({handleClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [error, setError] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);

    const signUp = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully:', userCredential.user);
            setError(null);

            const apiUrl = process.env.REACT_APP_API_URL;
            const response = await fetch(`${apiUrl}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: userCredential.user.uid,
                    email: email,
                    username: username,
                    firstname: firstname,
                    lastname: lastname,
                }),
            });

            if (!response.ok) {
                const responseText = await response.text();
                let errorMessage = 'Error creating user in the database';
                try {
                    const errorData = JSON.parse(responseText);
                    errorMessage = errorData.message || errorMessage;
                } catch (e) {
                    console.error('Failed to parse server response as JSON:', e);
                }
                throw new Error(errorMessage);
            }

            setIsRegistered(true);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSuccessfulRegistration = () => {
        setIsRegistered(false);
        handleClose();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                { !isRegistered ? (
                    <>
                        <Typography component="h1" variant="h5" className="custom-text">
                            Sign Up
                        </Typography>
                        <Box component="form" onSubmit={signUp} sx={{ mt: 3 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Username"
                                autoComplete="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="First Name"
                                autoComplete="given-name"
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Last Name"
                                autoComplete="family-name"
                                value={lastname}
                                onChange={(e) => setLastname(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Email"
                                type="email"
                                autoComplete="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                autoComplete="new-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Box>
                        {error && (
                            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
                                {error}
                            </Typography>
                        )}
                    </>
                ) : (
                    <>
                        <Typography variant="h5">Successfully registered!</Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSuccessfulRegistration}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Close
                        </Button>
                    </>
                )}
            </Box>
        </Container>
    );
};

export default SignUp;
