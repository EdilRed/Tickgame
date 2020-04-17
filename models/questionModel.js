const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  answers: [String],
  correctAnswer: Number,
});

questionSchema.index({
  category: 1,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
