// Sanguin model
import Sanguin from '../../models/Sanguin';

// Validation
import validateSanguinInput from '../../validation/sanguin';

const passport = require('passport');
const express = require('express');

const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Sanguin Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Sanguin.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(() => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Sanguin.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: 'No post found with that ID' });
      }
    })
    .catch(() =>
      res.status(404).json({ nopostfound: 'No post found with that ID' }),
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSanguinInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newSanguin = new Sanguin({
      value: req.body.name,
      label: req.body.name,
      name: req.body.name,
    });

    newSanguin.save().then(post => res.json(post));
  },
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Sanguin.findById(req.params.id)
      .then((post) => {
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSanguinInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Sanguin.findById(req.params.id)
      .then((post) => {
        // Add to comments array
        post.name = req.body.name;
        post.label = req.body.name;
        post.value = req.body.name;

        // Save
        post.save()
          .then(post => res.json(post))
          .catch(() => res.status(400).json({ errors: 'No found' }));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateSanguinInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Sanguin.findById(req.params.id)
      .then((post) => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id,
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Sanguin.findById(req.params.id)
      .then((post) => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id,
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(() => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// module.exports = router;
export default router;
