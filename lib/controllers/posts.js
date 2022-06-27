const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Post = require('../models/Post');
const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.getAll();
    res.json(posts);
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticate, async (req, res, next) => {
  try {
    const post = await Post.insert(req.body);
    res.json(post);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
