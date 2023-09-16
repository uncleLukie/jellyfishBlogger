import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Modal, Box, Container, Avatar  } from "@mui/material";
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
        <AppBar position="static" style={{ backgroundColor: '#1E293B' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
                    <Box display="flex" alignItems="center">
                        <Avatar alt="jellyfishBlogger icon" src="/jellygreen.png" style={{ marginRight: '8px' }} />
                        <Typography
                            variant="h6"
                            component={Link}
                            to="/"
                            sx={{
                                textDecoration: 'none',
                                color: 'white',
                                fontFamily: 'Lato, sans-serif',
                                '&:hover': {
                                    backgroundColor: '#2D4A69',
                                },
                            }}
                        >
                            jellyfishBlogger
                        </Typography>
                    </Box>
                    <Box>
                        {isUserSignedIn ? (
                            <>
                                <Button color="inherit" component={Link} to="/createpost" style={{ '&:hover': { color: '#1E293B', backgroundColor: '#E5E7EB' } }}>
                                    ink it
                                </Button>
                                <Button color="inherit" onClick={logout} style={{ '&:hover': { color: '#1E293B', backgroundColor: '#E5E7EB' } }}>
                                    drift out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button color="inherit" onClick={handleOpenLogin} style={{ '&:hover': { color: '#1E293B', backgroundColor: '#E5E7EB' } }}>
                                    ride the tide
                                </Button>
                                <Button color="inherit" onClick={handleOpenSignUp} style={{ '&:hover': { color: '#1E293B', backgroundColor: '#E5E7EB' } }}>
                                    join the swarm
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
