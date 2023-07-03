const Post = require('../models/post');
const User = require('../models/user');
const Category = require('../models/category');

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, content, author, category, image } = req.body;

        // Check if the author exists
        const user = await User.findOne({ uid: author });
        if (!user) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Check if the user is allowed to post
        if (!user.canPost) {
            return res.status(403).json({ message: 'User is not allowed to create posts' });
        }

        // Check if the category exists
        const categoryObj = await Category.findOne({ name: category });
        if (!categoryObj) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const post = new Post({ title, content, author: user.uid, category: categoryObj._id, image });
        await post.save();
        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error creating post', error });
    }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('category', 'name');
        const populatedPosts = await Promise.all(
            posts.map(async post => {
                const author = await User.findOne({ uid: post.author });
                return { ...post._doc, author };
            })
        );
        res.status(200).json(populatedPosts);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Error fetching posts', error });
    }
};

// Get post by ID
exports.getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id).populate('author', 'username').populate('category', 'name');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching post', error });
    }
};

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, category, image } = req.body;

        const categoryObj = await Category.findOne({ name: category });
        if (!categoryObj) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const post = await Post.findByIdAndUpdate(id, { title, content, category: categoryObj._id, image }, { new: true });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: 'Error updating post', error });
    }
};

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting post', error });
    }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId, content } = req.body;

        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = {
            user: userId,
            content: content,
        };

        post.comments.push(comment);
        await post.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: 'Error adding comment', error });
    }
};

// Delete a comment from a post
exports.deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const commentIndex = post.comments.findIndex((c) => c._id.toString() === commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        post.comments.splice(commentIndex, 1);
        await post.save();
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting comment', error });
    }
};