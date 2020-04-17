const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('../models/questionModel');
const Record = require('../models/recordModel');

dotenv.config({
  path: './config.env',
});

const MONGODB_URI = process.env.DATABASE;
const MONGODB_OPTIONS = {
  dbName: 'Tickgame',
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

// Connect to mongoDB
mongoose
  .connect(MONGODB_URI, MONGODB_OPTIONS)
  .then(() => console.log('DB connection successful!'))
  .catch((err) => {
    throw new Error(err.message);
  });
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error: ', err);
});

// READ JSON FILE
const questions = JSON.parse(
  fs.readFileSync(`${__dirname}/questions.json`, 'utf-8')
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Question.create(questions);
    await Record.create({
      fromQuestion: '5c88fa8cf4afda39709c2955',
      fromUser: '5c88fa8cf4afda39709c2956',
      addedCoin: 100,
      totalCoin: 100,
    });
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Record.deleteMany();
    await Question.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  console.log('Importing data...');
  importData();
} else if (process.argv[2] === '--delete') {
  console.log('Deleting data...');
  deleteData();
}
