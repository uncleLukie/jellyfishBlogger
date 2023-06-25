import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const { user } = useContext(UserContext);

    const submitPost = async () => {
        try {
            const response = await axios.post('http://localhost:5000/posts', {
                title,
                content,
                category,
                author: user.uid,
            });
            if (response.status === 201) {
                alert('Post created successfully');
                setTitle('');
                setContent('');
                setCategory('');
            }
        } catch (error) {
            alert(`Failed to create post: ${error.message}`);
        }
    };

    return (
        <div>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <button onClick={submitPost}>Create Post</button>
        </div>
    );
};

export default CreatePost;
