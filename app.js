if(process.env.ENV!=='production'){
    require('dotenv').config()
}
var createError = require('http-errors');
var express = require('express');
var mongoose = require('mongoose')
var path = require('path');
var flash = require('connect-flash');
var logger = require('morgan');
var ejsMate = require('ejs-mate')
var methodOverride = require('method-override')
var session = require('express-session')
var mongoSanitize = require('express-mongo-sanitize');
var passport = require('passport')
var LocalStrategy = require('passport-local')
var MongoStore = require('connect-mongo')
const User = require('./model/users')
const Club = require("./model/clubsModel")

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var profileRouter = require('./routes/profile');


var app = express();

// view engine setup
app.engine('ejs',ejsMate)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const mongoUrl = process.env.MONGODB_URL
// mongoose.connect('mongodb://localhost:27017/clubhub').then(()=>{
mongoose.connect(mongoUrl).then(()=>{
  console.log("connection!!")
}).catch((err)=>{
  console.log(err)
})


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'))
app.use(session({
    name:'session',
    secret:'thisisnotagoodsecret',
    resave:false,
    saveUninitialized:false,
    // cookie: { secure: true }
    cookie :{
        httpOnly:true,
        expires: Date().now + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    },
    store : MongoStore.create({
        mongoUrl : mongoUrl,
        touchAfter: 24 * 60 *60*1000
    })
}))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(async(req,res,next)=>{
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    res.locals.currentUser = req.user
    res.locals.validationError = req.flash('validationError')
    next()
})



app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/user',profileRouter)

app.use((err,req,res,next)=>{
    const {status=400} = err;
    res.status(status).render("error",{err})
})

module.exports = app;
