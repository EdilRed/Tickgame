const Question = require('../models/questionModel');
const User = require('../models/userModel');
const Record = require('../models/recordModel');

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

exports.getAllQuestions = async (req, res, next) => {
  try {
    const questions = await Question.find();

    res.status(200).json({
      status: 'success',
      data: questions,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.createQuestion = async (req, res, next) => {
  try {
    const payload = req.body;

    const question = await Question.create(payload);

    res.status(201).json({
      status: 'success',
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.deleteQuestion = async (req, res, next) => {
  try {
    const id = req.params.id;

    const question = await Question.findByIdAndDelete(id);

    if (!question) {
      res.status(400).json({
        status: 'fail',
        message: 'Not found this question with that id.',
      });
      throw new Error('Not found this question with that id.');
    }

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.getQuestion = async (req, res, next) => {
  try {
    const id = req.params.id;

    const question = Question.findById(id);

    res.status(200).json({
      status: 'success',
      data: question,
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.deleteAllQuestions = async (req, res, next) => {
  try {
    await Question.deleteMany();

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.messag,
    });
    throw new Error(err.message);
  }
};

exports.shuffleQuestion = async (req, res, next) => {
  try {
    const category = req.params.category;

    const questions = await Question.find({ category });

    if (questions.length < 1) {
      res.status(204).json();
      return next();
    }

    const index = getRandomInt(0, questions.length);

    res.status(200).json({
      status: 'success',
      data: questions[index],
    });
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};

exports.correctAnswer = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, answer } = req.body;

    const user = await User.findOne({ name });

    const question = await Question.findById(id);
    if (question.correctAnswer === answer) {
      const record = await Record.find();
      const lastRecord = record[record.length - 1];

      await Record.create({
        fromQuestion: id,
        fromUser: user._id,
        addedCoin: 10,
        totalCoin: lastRecord.totalCoin + 10,
      });
      console.log('Correct Answer');

      res.status(200).json({
        status: 'correct',
      });
    } else {
      res.status(200).json({
        status: 'incorrect',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'error',
      message: err.message,
    });
    throw new Error(err.message);
  }
};
