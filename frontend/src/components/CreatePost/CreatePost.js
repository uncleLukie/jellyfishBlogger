import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Container, Grid } from '@mui/material';
import Header from '../Header/Header';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const user = useContext(UserContext);

    const uid = user ? user.uid : null;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
                alert('Failed to fetch categories');
            }
        };
        fetchCategories();
    }, []);

    const submitPost = async () => {
        if (!uid) {
            alert('User not signed in');
            return;
        }
        const selectedCategory = categories.find(cat => cat._id === category);
        const categoryName = selectedCategory ? selectedCategory.name : '';

        try {
            await axios.post('/api/posts', { title, content, author: uid, category: categoryName });
            alert('Post created successfully');
            setTitle('');
            setContent('');
            setCategory('');
        } catch (error) {
            console.error(error);
            alert(`Failed to create post: ${error.message}`);
        }
    };

    return (
        <div>
            <Header />
            <Container>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Box component="form" noValidate autoComplete="off" sx={{ '& > :not(style)': { m: 1 }, maxWidth: 500 }}>
                            <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} fullWidth />
                            <TextField
                                label="Content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                multiline
                                rows={12} // 3x larger content box
                                variant="outlined"
                                fullWidth
                            />
                            <FormControl fullWidth>
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {categories.map((cat) => (
                                        <MenuItem key={cat._id} value={cat._id}>{cat.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="contained" onClick={submitPost}>Create Post</Button>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default CreatePost;
