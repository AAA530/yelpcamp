var express = require('express')
var router = express.Router()
var camp = require('./../models/camps')
var comment = require('./../models/comment')


//============================
// Comments Routes
//============================

router.get("/campgrounds/:id/comments/new",isLoggedIn,(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec((err,fcamp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcamp)
            res.render('new_comment',{camp : fcamp});
        }
    })
})

router.post("/campgrounds/:id/comments",isLoggedIn,(req,res)=>{
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

function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

module.exports = router