var express = require('express')
var router = express.Router()
var user = require('./../models/user')
var passport = require('passport')

//============================
// Auth Routes
//============================

router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',(req,res)=>{
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
router.get('/login',(req,res)=>{
    res.render("login")
})

router.post('/login', passport.authenticate('local',{
    successRedirect : "/campgrounds",
    failureRedirect : "/login"
}) ,(req,res)=>{
})

router.get('/logout',(req,res)=>{
    req.logOut()
    res.redirect("/campgrounds")
})

function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

module.exports = router