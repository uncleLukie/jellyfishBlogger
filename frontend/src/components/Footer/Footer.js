import React from 'react';
import { Container, Typography } from '@mui/material';

const Footer = () => {
  return (
    <footer>
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © Jellyfish Blogger 2023
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
