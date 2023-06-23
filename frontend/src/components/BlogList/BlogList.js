import React from 'react';
import { Box, Typography } from '@mui/material';

const BlogList = () => {
    // For now, use some dummy data to display blog posts
    const blogPosts = [
        { id: 1, title: 'First Post', author: 'John Doe', content: 'This is the first blog post.' },
        { id: 2, title: 'Second Post', author: 'Jane Doe', content: 'This is the second blog post.' },
        { id: 3, title: 'Third Post', author: 'John Doe', content: 'This is the third blog post.' },
    ];

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Blog Posts
            </Typography>
            {blogPosts.map((post) => (
                <Box key={post.id} sx={{ mt: 4 }}>
                    <Typography variant="h5">{post.title}</Typography>
                    <Typography variant="subtitle1" color="text.secondary">{post.author}</Typography>
                    <Typography variant="body1">{post.content}</Typography>
                </Box>
            ))}
        </Box>
    );
};

export default BlogList;
