import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardActionArea, CardMedia, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                const response = await axios.get('/api/posts');
                setBlogPosts(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch blog posts');
            }
        };
        fetchBlogPosts();
    }, []);

    const goToPost = (id) => {
        navigate(`/post/${id}`);
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Blog Posts
            </Typography>
            {blogPosts.map((post, index) => (
                <Card key={post._id} sx={{ mt: 4, transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                    <CardActionArea onClick={() => goToPost(post._id)}>
                        <Grid container spacing={2} flexDirection={index % 2 === 0 ? 'row-reverse' : 'row'} alignItems="stretch">
                            <Grid item xs={12} md={6}>
                                <CardMedia
                                    component="img"
                                    sx={{
                                        objectFit: 'cover',
                                        aspectRatio: '16/9' // Adjust as needed
                                    }}
                                    image={post.image}
                                    alt={post.title}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CardContent>
                                    <Typography variant="h5">{post.title}</Typography>
                                    <Typography variant="subtitle1" color="text.secondary">{post.category.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">By: {post.author.username}</Typography>
                                    <Typography variant="body1">{post.content.slice(0, 100) + '...'}</Typography>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </CardActionArea>
                </Card>
            ))}
        </Box>
    );
};

export default BlogList;
