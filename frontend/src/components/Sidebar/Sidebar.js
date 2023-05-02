import React from 'react';
import { Box, Typography } from '@mui/material';

const Sidebar = () => {
  // For now, use some dummy data to display categories
  const categories = [
    { name: 'Technology' },
    { name: 'Travel' },
    { name: 'Lifestyle' },
    { name: 'Food' },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Categories
      </Typography>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <Typography variant="body1">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Sidebar;
