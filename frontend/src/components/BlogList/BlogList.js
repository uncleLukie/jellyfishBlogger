import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, CardActionArea, CardMedia, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

const BlogList = () => {
    const [blogPosts, setBlogPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMoreData(); // Call the fetchMoreData function on component mount
    }, []); // Empty dependency array so it runs only once on mount
    const fetchMoreData = async () => {
        try {
            const response = await axios.get(`/api/posts?page=${page}&limit=5`);
            if (response.data.length > 0) {
                setBlogPosts((prevPosts) => {
                    const newPosts = response.data.filter((data) =>
                        prevPosts.every((prevData) => prevData._id !== data._id)
                    );
                    return [...prevPosts, ...newPosts];
                });
                setPage(page + 1);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error(error);
            alert('Failed to fetch more blog posts');
        }
    };

    const goToPost = (id) => {
        navigate(`/post/${id}`);
    };


    return (
        <Box sx={{ mt: 4 }}>
            <Typography
                variant="h4"
                gutterBottom
                sx={{
                    color: '#1E293B',
                    fontWeight: 'bold',
                    fontFamily: 'Lato, sans-serif',
                    mb: 2,
                    transition: '0.3s',
                    cursor: 'pointer',
                    '&:hover': {
                        transform: 'scale(1.05)',
                        color: '#3E4C6D'
                    }
                }}
            >
                the smack~
            </Typography>
            <InfiniteScroll
                dataLength={blogPosts.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {blogPosts.map((post, index) => (
                    <Card
                        key={post._id}
                        sx={{
                            mt: 4,
                            transition: '0.3s',
                            '&:hover': { transform: 'scale(1.02)' },
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                            mb: 1,
                        }}
                    >
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
                                        <Typography variant="body1">{`${post.content.substring(0, 100)}...`}</Typography>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </CardActionArea>
                    </Card>
                ))}
            </InfiniteScroll>
        </Box>
    );
};

export default BlogList;
