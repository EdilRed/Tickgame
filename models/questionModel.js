const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    category: String,
    question: String,
    answers: [String],
    correctAnswer: String
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;