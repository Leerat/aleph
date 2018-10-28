const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// SHOULD BE DEV BUT DONT WORK (=
// const webpack = require('webpack')
// const wpDevMiddleware = require('webpack-dev-middleware');
// const wpConfig = require('./webpack.config')
// console.log('---', wpConfig)
// const compiler = webpack(wpConfig)

const auth = require('./server/routes/auth');
const users = require('./server/routes/users');
const posts = require('./server/routes/posts');

// We can use passport.js with redis for caching sessions
const checkAuth = (req, res, next) => {
  console.log('---', 'Here should be jwt headers check ')
  next()
}

const app = express();

// view engine setup if we want to render smth on server
// app.set('views', path.join(__dirname, 'server/views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api/auth', auth);
app.use('/api/users', checkAuth, users);
app.use('/api/posts', checkAuth, posts);

// PROD
app.use('*', express.static(path.join(__dirname, 'dist'))); //fallback to index for react-router

// SHOULD BE DEV BUT DONT WORK (=
// app.use(wpDevMiddleware(compiler), {
//   contentBase: [path.resolve(root, 'dist'), path.resolve(root, 'static')],
//   publicPath: '/',
//   historyApiFallback: true,
// })

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;
  const error = (err && err.errors && err.errors[0] && err.errors[0].message) || err.message

  res.status(err.status || 500);
  res.json({
    error: true,
    message: error
  })
});

module.exports = app;
