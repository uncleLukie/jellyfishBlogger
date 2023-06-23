import React, { useState, useRef } from 'react';
import { AppBar, Button, Toolbar, Typography, Modal, Box } from '@mui/material';
import { auth, signOut } from '../../firebase/firebase';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

const Header = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);

    const loginRef = useRef();
    const signupRef = useRef();

    const handleLogout = async () => {
        await signOut(auth);
        console.log('User logged out');
        setLoggedIn(false);
    };

    const handleOpenLogin = () => setOpenLogin(true);
    const handleCloseLogin = () => setOpenLogin(false);

    const handleOpenSignUp = () => setOpenSignUp(true);
    const handleCloseSignUp = () => setOpenSignUp(false);

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    App Name
                </Typography>
                {loggedIn ? (
                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button color="inherit" onClick={handleOpenLogin}>
                            Login
                        </Button>
                        <Modal
                            open={openLogin}
                            onClose={handleCloseLogin}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            ref={loginRef}
                        >
                            <Box sx={style}>
                                <Login setLoggedIn={setLoggedIn} close={handleCloseLogin} />
                                <Button color="primary" onClick={handleOpenSignUp}>
                                    Sign Up
                                </Button>
                            </Box>
                        </Modal>
                        <Modal
                            open={openSignUp}
                            onClose={handleCloseSignUp}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                            ref={signupRef}
                        >
                            <Box sx={style}>
                                <SignUp setLoggedIn={setLoggedIn} close={handleCloseSignUp} />
                            </Box>
                        </Modal>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default Header;
