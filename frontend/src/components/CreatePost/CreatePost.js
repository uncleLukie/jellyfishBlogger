import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../UserContext/UserContext';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');

    const user = useContext(UserContext);

    const uid = user ? user.uid : null;

    const submitPost = async () => {
        if (!uid) {
            alert('User not signed in');
            return;
        }
        try {
            await axios.post('/api/posts', { title, content, author: uid, category });
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
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content"></textarea>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" />
            <button onClick={submitPost}>Create Post</button>
        </div>
    );
};

export default CreatePost;
