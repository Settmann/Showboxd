const express = require('express');

const {
  getAllShows,
  getFourRandomShows
} = require('../controllers/show.controllers');

const router = express.Router();

router.route('/').get(getAllShows);
router.route('/rand').get(getFourRandomShows);
// router.route('/archive/:year').get(getMoviesByYear);

module.exports = router;
