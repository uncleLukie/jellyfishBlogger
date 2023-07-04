import React from 'react';
import Header from '../Header/Header';
import BlogList from '../BlogList/BlogList';
import Footer from '../Footer/Footer';
import { Container, Grid } from '@mui/material';

const HomePage = () => {
    return (
        <div>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <BlogList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </div>
    );
};

export default HomePage;
