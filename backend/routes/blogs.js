const express = require('express');
const Blog = require('../models/Blog');
const { authenticateToken, authorizeRole } = require('../middleware/auth');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (err) {
        res.status(500).send('Error fetching blogs');
    }
});

router.post('/', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        const blog = new Blog(req.body);
        await blog.save();
        res.status(201).send('Blog created');
    } catch (err) {
        res.status(500).send('Error creating blog');
    }
});

router.delete('/:id', authenticateToken, authorizeRole('admin'), async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.send('Blog deleted');
    } catch (err) {
        res.status(500).send('Error deleting blog');
    }
});

module.exports = router;
