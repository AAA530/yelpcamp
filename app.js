var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose'); 
var passport = require('passport')
var LocalStrategy = require('passport-local')
var app = express();

var commentRoutes = require('./routes/comment')
var campgroundRoutes = require('./routes/campground')
var indexRoutes = require('./routes/index')

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(express.static('public')); // This line is for connecting custom css and javascript.
app.use(body_parser.urlencoded({extended : true}))

app.set("view engine","ejs");

//modules are required here
var comment = require('./models/comment')
var camp = require('./models/camps')
var user = require('./models/user')
var seedDB = require('./seeds')

// seedDB();


//passport config
app.use(require('express-session')({
    secret : "this dhairya patel",
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(user.authenticate()))
passport.serializeUser(user.serializeUser())
passport.deserializeUser(user.deserializeUser())

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    next();
})


app.use(commentRoutes)
app.use(campgroundRoutes)
app.use(indexRoutes)

//start server at particular port
app.listen(3000,function(){
    console.log("success!");
})