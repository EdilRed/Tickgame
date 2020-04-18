const axios = require('axios');
const Question = require('../models/questionModel');
const Record = require('../models/recordModel');
const alert = require('alert-node');

exports.getOverview = async (req, res, next) => {
    try {
        const records = await Record.find();
        const coin = records[records.length - 1];
        res.status(200).render('base', {
            coin,
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getLoginForm = (req, res) => {
    res.status(200).render('base', {
        title: 'Log into your account',
    });
};

exports.getQuestion = async (req, res, next) => {
    try {
        const slug = req.params.slug;

        const records = await Record.find();
        const coin = records[records.length - 1];

        const findUrl =
            req.protocol + '://' + req.get('host') + '/api/questions/shuffle/' + slug;

        // Get shuffle question by category
        const response = await axios({
            method: 'GET',
            url: findUrl,
        });
        const question = response.data.data;

        res.status(200).render('question', {
            title: `Tickgame | ${question.category}`,
            question,
            coin,
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

exports.getCorrectAnswer = async (req, res, next) => {
    try {
        // '/:qid/:index'
        const {
            qid,
            index
        } = req.params;

        // Get coin
        const records = await Record.find();
        const coin = records[records.length - 1];

        let findUrl =
            req.protocol + '://' + req.get('host') + `/api/questions/${qid}`;

        let response = await axios({
            method: 'POST',
            url: findUrl,
            data: {
                name: 'admin',
                answer: parseInt(index),
            },
        });
        const status = response.data.status;

        if (status === 'correct') {
            alert('Correct Answer! you donated 10 coins.');
        }

        let question = await Question.findById(qid);

        findUrl =
            req.protocol +
            '://' +
            req.get('host') +
            '/api/questions/shuffle/' +
            question.slug;

        // Get shuffle question by category
        response = await axios({
            method: 'GET',
            url: findUrl,
        });
        question = response.data.data;

        res.status(200).redirect(`/${question.slug}`);
    } catch (err) {
        throw new Error(err.message);
    }
};