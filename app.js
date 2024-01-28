var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// setting
app.use(logger('dev'));
app.use(express.json());
// req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// static -> 照片,css
app.use(express.static(path.join(__dirname, 'public')));




// express-session
const session = require('express-session');

app.use(session({
    secret: 'secret-key', // 用於加密 session 的密鑰，應保持安全
    resave: true,
    saveUninitialized: true
}));



// sequelize
const sequelize = require('./util/database')
sequelize.authenticate().then(()=>{
  console.log("connection success")
})


// migration
sequelize.sync().then(()=>{
  console.log('資料表已同步')
})

const User = require('./models/user')

// login middleware
app.use((req,res,next)=>{
  if(req.session.isAuthenticated === true){
    User.findOne({where:{"username":req.session.user.username}}).then(user=>{
       res.locals.isAuthenticated  = true
       res.locals.AuthenticatedUser = user
       res.locals.user_id = req.session.user.id
       next()

    })
  }else{
    res.locals.isAuthenticated  = false
    next()
  }
})

// router
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const articleRouter = require('./routes/article')
app.use('/', indexRouter);
app.use('/', userRouter);
app.use('/', articleRouter)



// error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
