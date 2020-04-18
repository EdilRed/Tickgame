const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const userRouter = require('./routes/userRoutes');
const questionRouter = require('./routes/questionRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Implement CORS
app.use(cors());

app.options('*', cors());

// Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  express.json({
    limit: '10kb',
  })
);

// ROUTES
app.get('/', (req, res) => {
  res.status(200).render('base');
});

app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);

app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'error',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
  throw new Error(`Can't find ${req.originalUrl} on this server!`);
});

module.exports = app;
