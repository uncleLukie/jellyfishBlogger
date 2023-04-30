const express = require('express');
const router = express.Router();
const admin = require('../firebaseAdmin');

router.post('/', async (req, res) => {
    const idToken = req.body.token;

    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        console.log('Token successfully verified:', decodedToken);
        res.status(200).send('Token verified');
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(400).send('Token verification failed');
    }
});

module.exports = router;
