const mongoose = require('mongoose');
const slugify = require('slugify');

const questionSchema = new mongoose.Schema({
  category: String,
  question: String,
  answers: [String],
  correctAnswer: Number,
  slug: String,
});

questionSchema.index({
  category: 1,
});

questionSchema.pre('save', function (next) {
  this.slug = slugify(this.category, {
    lower: true,
  });
  next();
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
