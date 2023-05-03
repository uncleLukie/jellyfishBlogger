const User = require('../models/user');
const admin = require('../firebaseAdmin');

// Get user by UID
exports.getUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findById(uid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user', error });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const { username, email, firstname, lastname } = req.body;
        const user = await User.findByIdAndUpdate(uid, { username, email, firstname, lastname }, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { uid } = req.params;
        const user = await User.findByIdAndDelete(uid);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting user', error });
    }
};

// Register a new user
exports.registerUser = async (req, res) => {
    const { uid, email, username, firstname, lastname } = req.body;

    try {
        // Check if the user with the same Firebase UID exists
        const existingUser = await User.findOne({ uid });
        if (existingUser) {
            await admin.auth().deleteUser(uid); // Delete user from Firebase if it exists in MongoDB
            return res.status(400).json({ message: 'User already exists' });
        }

        // Check if the user with the same username exists
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername) {
            await admin.auth().deleteUser(uid); // Delete user from Firebase if the username is taken
            return res.status(400).json({ message: 'Username already taken' });
        }

        const newUser = new User({
            uid,
            email,
            username,
            firstname,
            lastname,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        console.log('Deleting user from Firebase:', uid);
        await admin.auth().deleteUser(uid); // Delete user from Firebase if there's an error registering in MongoDB
        res.status(400).json({ message: 'Error registering user', error });
    }
};

exports.login = (req, res) => {
    // Your logic for logging in a user
};