const express = require('express');
const questionController = require('../controllers/questionController');

const router = express.Router();

router
    .route('/')
    .post(questionController.createQuestion)
    .get(questionController.getAllQuestions)
    .delete(questionController.deleteAllQuestions);

router
    .route('/:id')
    .post(questionController.correctAnswer)
    .delete(questionController.deleteQuestion);

router.get('/shuffle', questionController.shuffleQuestion);

module.exports = router;