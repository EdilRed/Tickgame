const express = require('express');
const viewsController = require('../controllers/viewsController');

const router = express.Router();

router.get('/', viewsController.getOverview);
// router.get('/', viewsController.getLoginForm);
router.get('/:slug', viewsController.getQuestion);
router.get('/:qid/:index', viewsController.getCorrectAnswer);

module.exports = router;
