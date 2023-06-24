import React, { useState, useEffect } from "react";
import { AppBar, Button, Toolbar, Typography, Modal, Box } from "@mui/material";
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
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Jellyfish Blogger
                </Typography>
                {isUserSignedIn ? (
                    <Button color="inherit" onClick={logout}>
                        Logout
                    </Button>
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
