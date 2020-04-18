const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router
  .route('/')
  .post(questionController.createQuestion)
  .get(questionController.getAllQuestions)
  .delete(questionController.deleteAllQuestions);

router.get('/shuffle/:slug', questionController.shuffleQuestion);

router
  .route('/:id')
  .post(questionController.correctAnswer)
  .get(questionController.getQuestion)
  .delete(questionController.deleteQuestion);

module.exports = router;