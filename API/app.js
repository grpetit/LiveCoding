var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

const Session = require('express-session');
const FileStore = require('session-file-store')(Session);
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mapRouter = require('./routes/map');
var blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Session({
  store: new FileStore({
      path: path.join(__dirname, '/tmp'),
      encrypt: true
  }),
  secret: 'Super Secret !',
  resave: true,
  saveUninitialized: true,
  name : 'sessionId'
}));





app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/map', mapRouter);
app.use('/blog',blogRouter);
app.get('/api/pandora/upcoming',(req,res)=>{
  http.get('https://api.pandascore.co/ow/matches/upcoming.json?token=mJ8REQ0o29P34viQidrlA7hIs6vKs94-orJbzoWY-2ZMMY9TAoo')
    .then(res => {
      return res.json()
    })
    .then(result => res.json(result))
    .catch(function(error) {
console.log(error)});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
