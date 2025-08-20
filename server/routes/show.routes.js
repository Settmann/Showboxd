const express = require('express');

const {
  getAllShows
} = require('../controllers/show.controllers');

const router = express.Router();

router.route('/').get(getAllShows);
// router.route('/archive/:year').get(getMoviesByYear);
// router.route('/:id').get(getMovieById);

module.exports = router;
