import React from 'react';
import Header from '../Header/Header';
import BlogList from '../BlogList/BlogList';
import Footer from '../Footer/Footer';
import { Container, Grid, Box } from '@mui/material';

const HomePage = () => {
    return (
        <Box style={{ backgroundColor: '#F1F5F9', minHeight: '100vh' }}>
            <Header />
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <BlogList />
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Box>
    );
};

export default HomePage;
