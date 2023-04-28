require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const mongoose= require('mongoose');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@db:27017/${process.env.MONGO_INITDB_DATABASE}?authSource=admin`;

//console.log('MONGODB_URI:', MONGODB_URI);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// An example API endpoint
app.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello from the backend!' });
});

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});
