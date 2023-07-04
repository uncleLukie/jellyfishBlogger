import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Modal, Box, Container } from "@mui/material";
import { Link } from 'react-router-dom';
import { auth, signOut, onAuthStateChanged } from "../../firebase/firebase";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";

function Header() {
    const [loginOpen, setLoginOpen] = useState(false);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [isUserSignedIn, setIsUserSignedIn] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setIsUserSignedIn(!!user);
        });

        // Clean up the subscription
        return unsubscribe;
    }, []);

    const handleOpenLogin = () => {
        setLoginOpen(true);
    };

    const handleCloseLogin = () => {
        setLoginOpen(false);
    };

    const handleOpenSignUp = () => {
        setSignUpOpen(true);
    };

    const handleSuccessfulRegistration = () => {
        setSignUpOpen(false);
    };

    const logout = () => {
        signOut(auth);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'white',
                            fontFamily: 'Courier New,Courier,monospace',
                            '&:hover': {
                                color: '#ff00fb',  // Change to the color you want on hover
                            },
                            '&:active': {
                                color: '#08ff00',  // Change to the color you want on click
                            }
                        }}
                    >
                        jellyfishBlogger
                    </Typography>
                    <Box>
                        {isUserSignedIn ? (
                            <>
                                <Button color="inherit" component={Link} to="/createpost">
                                    Create Post
                                </Button>
                                <Button color="inherit" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" onClick={handleOpenLogin}>
                                    Login
                                </Button>
                                <Button color="inherit" onClick={handleOpenSignUp}>
                                    Sign Up
                                </Button>
                            </>
                        )}
                    </Box>
                    <Modal open={loginOpen} onClose={handleCloseLogin}>
                        <Box sx={style}>
                            <Login handleClose={handleCloseLogin} handleOpenSignUp={handleOpenSignUp} />
                        </Box>
                    </Modal>
                    <Modal open={signUpOpen} onClose={handleSuccessfulRegistration}>
                        <Box sx={style}>
                            <SignUp handleClose={handleSuccessfulRegistration} />
                        </Box>
                    </Modal>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

export default Header;
