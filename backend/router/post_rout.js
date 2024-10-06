const router = require('express').Router();
const Post = require('../schemas/post_schema');
const authenticate = require('../authentication/auth');

router.post('/', authenticate, async (req, res) => {
    const { text, image } = req.body;

    if (!text) return res.status(400).json({ error: 'Please fill in field' });

    const newPost = new Post({ text, author: req.user._id, image: image || '' });

    try {
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json({ error: 'Post creation failed' });
    }
})

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username').populate('comments.user', 'username')
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

router.put('/:id/like', authenticate, async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ error: 'Post not found' });

    if (!post.likes.includes(req.user._id)) {
        post.likes.push(req.user._id)
    } else {
        post.likes.pull(req.user._id)
    }
    await post.save();
    res.status(200).json(post);
})

router.post('/:id/comment', authenticate, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ error: 'Post not found' });

        if (!req.body.comment) return res.status(400).json({ error: 'Comment cannot be empty' });

        const newComment = { user: req.user._id, comment: req.body.comment };
        post.comments.unshift(newComment);

        await post.save();
        const updatedPost = await Post.findById(req.params.id).populate('comments.user', 'username');
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router;