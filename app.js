var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose'); 
var passport = require('passport')
var LocalStrategy = require('passport-local')
var app = express();

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


app.get('/',(req,res)=>{
    res.render("landing")
})

app.get('/campgrounds',(req,res)=>{
    camp.find({},(err,camp)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campground",{campground : camp});
        }
    })
});


app.post('/campgrounds',(req,res)=>{

    //to add data to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var n = {name : name ,image:image ,description : desc}
    
    camp.create(n , (err,camp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(camp);
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new',(req,res)=>{
    res.render('new_camp');
})

app.get('/campgrounds/:id',(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec((err,fcamp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcamp)
            res.render('show',{camp : fcamp});
        }
    })
})


//============================
// Auth Routes
//============================

app.get('/register',(req,res)=>{
    res.render('register')
})

app.post('/register',(req,res)=>{
    var nuser = new user({username : req.body.username})
    user.register(nuser, req.body.password ,(err,user)=>{
        if(err){
            res.redirect('/register')
        }else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect('/campgrounds')
            })
        }
    })
})

//login routes
app.get('/login',(req,res)=>{
    res.render("login")
})

app.post('/login', passport.authenticate('local',{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}) ,(req,res)=>{
})

app.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect("cmapgrounds")
})

function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

//============================
// Comments Routes
//============================

app.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec((err,fcamp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcamp)
            res.render('new_comment',{camp : fcamp});
        }
    })
})

app.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
    var n_comment = req.body.comment
    var id = req.params.id
    camp.findById(req.params.id,(err,camp)=>{
        if(err){
            console.log(err)
            res.redirect('/campgrounds')
        }else{
            comment.create(n_comment,(err,b_comment)=>{
                if(err){
                    console.log(err)
                }else{
                    camp.comments.push(b_comment)
                    camp.save()
                    res.redirect("/campgrounds/"+ id);
                }
            })
        }
    })
})


//start server at particular port
app.listen(3000,function(){
    console.log("success!");
})