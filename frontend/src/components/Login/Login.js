import React, { useState } from "react";
import { auth, signInWithEmailAndPassword } from "../../firebase/firebase";
import { TextField, Button, Grid, Typography, Link } from "@mui/material";

function Login({ handleClose, handleOpenSignUp }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            handleClose();
        } catch (error) {
            console.error("Error signing in", error);
        }
    };

    const handleSignUpClick = () => {
        handleClose();
        handleOpenSignUp();
    };

    return (
        <form onSubmit={handleSubmit}>
            <Grid container direction="column" spacing={2}>
                <Grid item>
                    <TextField
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" type="submit">
                        Login
                    </Button>
                </Grid>
                <Grid item>
                    <Typography>
                        Don't have an account?
                        <Link onClick={handleSignUpClick} style={{cursor: "pointer"}}>
                            Sign Up
                        </Link>
                    </Typography>
                </Grid>
            </Grid>
        </form>
    );
}

export default Login;
