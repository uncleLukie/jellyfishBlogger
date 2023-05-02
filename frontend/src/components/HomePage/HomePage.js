import React from 'react';
import Header from '../Header/Header';
import BlogList from '../BlogList/BlogList';
import Footer from '../Footer/Footer';
import Sidebar from '../Sidebar/Sidebar';
import { Container, Grid } from '@mui/material';

const HomePage = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <BlogList />
          </Grid>
          <Grid item xs={12} md={4}>
            <Sidebar />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
