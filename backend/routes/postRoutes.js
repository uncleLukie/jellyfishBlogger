const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.post('/:id/comments', postController.addComment);
router.delete('/:postId/comments/:commentId', postController.deleteComment);

module.exports = router;
