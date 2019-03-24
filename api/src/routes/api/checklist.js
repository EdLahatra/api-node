// Checklist model
import Checklist from '../../models/Checklist';
import User from '../../models/User';

// Validation
import validateChecklistInput from '../../validation/checklist';

const passport = require('passport');
const express = require('express');

const router = express.Router();


// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Checklists Works' }));

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById(req.user.id)
      .then((post) => {
        if (!post) res.status(404).json({ postnotfound: 'No post found' });
        res.json({ checklist: post.checklist });
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  });

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  Checklist.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Checklist.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ nopostfound: 'No post found with that ID' });
      }
    })
    .catch(err =>
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
    const { errors, isValid } = validateChecklistInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newChecklist = new Checklist({
      // intitule: req.body.intitule,
      // commentaire: req.body.commentaire,
      intitule: req.body.intitule,
      ordre: req.body.ordre,
      // categorie: req.body.categorie,
      commentaire: req.body.commentaire,
    });

    newChecklist.save().then(post => res.json(post));
  },
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.put(
  '/like-unlink',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    console.log('req.body =====>', req.body);
    User.findById(req.user.id)
      .then((post) => {
        // Add user id to likes array
        post.checklist = req.body;

        post.save().then(() => res.json(req.body));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOne({ user: req.user.id }).then((profile) => {
      Post.findById(req.params.id)
        .then((post) => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  },
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Checklist.findById(req.params.id)
      .then((post) => {
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChecklistInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Checklist.findById(req.params.id)
      .then((post) => {
        // Add to comments array
        post.intitule = req.body.intitule;

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateChecklistInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Checklist.findById(req.params.id)
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
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Checklist.findById(req.params.id)
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
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  },
);

// module.exports = router;
export default router;
