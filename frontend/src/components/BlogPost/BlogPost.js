import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardContent, CardMedia, Typography, CircularProgress } from "@mui/material";
import ReactMarkdown from 'react-markdown';
import Header from '../Header/Header';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`/api/posts/${id}`);
                setPost(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, [id]);

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <Header />
            <Box sx={{ mt: 4, p: 2 }}>
                <Card>
                    <CardMedia
                        component="img"
                        height="260"
                        image={post.image}
                        alt={post.title}
                    />
                    <CardContent>
                        <Typography variant="h4" gutterBottom>{post.title}</Typography>
                        <Typography variant="subtitle1" color="text.secondary">{post.category.name}</Typography>
                        <Typography variant="body2" color="text.secondary">By: {post.author.username}</Typography>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </CardContent>
                </Card>
            </Box>
        </>
    );
};

export default BlogPost;
