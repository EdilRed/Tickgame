const axios = require('axios');
const Record = require('../models/recordModel');

exports.getOverview = async (req, res, next) => {
    try {
        const records = await Record.find();
        const coin = records[records.length - 1];
        res.status(200).render('base', {
            coin
        });
    } catch (err) {
        throw new Error(err.message);
    }
}

exports.getLoginForm = (req, res) => {
    res.status(200).render('base', {
        title: 'Log into your account'
    });
};

exports.getQuestion = async (req, res, next) => {
    try {
        const slug = req.params.slug;

        const records = await Record.find();
        const coin = records[records.length - 1];

        const findUrl = req.protocol + '://' + req.get('host') + '/api/questions/shuffle/' + slug;

        // Get shuffle question by category
        const response = await axios({
            method: 'GET',
            url: findUrl
        });
        const question = response.data.data;

        res.status(200).render('question', {
            title: `Tickgame | ${question.category}`,
            question,
            coin
        });
    } catch (err) {
        throw new Error(err.message);
    }
}