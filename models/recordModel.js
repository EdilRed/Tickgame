const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  fromQuestion: {
    type: mongoose.Schema.ObjectId,
    ref: 'Question',
  },
  fromUser: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  addedCoin: Number,
  totalCoin: {
    type: Number,
    default: 0,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

// recordSchema.pre(/^find/, function (next) {
//     this.populate({
//         path: 'fromQuestion',
//         select: '-__v'
//     });
//     this.populate({
//         path: 'fromUser',
//         select: '-__v'
//     });
//     next();
// });

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
