require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const { requireAuth } = require('./middleware/basic-auth');
const loginRouter = require('./routers/login-router');
const usersRouter = require('./routers/users-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/Login', loginRouter);



app.use('/UserBuilds', requireAuth, usersRouter);


// eslint-disable-next-line no-unused-vars
app.use(function errorHandle(error, req, res, next) {
  let response;
  console.error(error);
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error'}};
  } else {
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;