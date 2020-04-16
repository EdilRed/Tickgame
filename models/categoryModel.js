const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category: String,
    questions: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Question'
    }]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;