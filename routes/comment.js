var express = require('express')
var router = express.Router()
var camp = require('./../models/camps')
var comment = require('./../models/comment')
var user = require('./../models/user')


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

                    b_comment.author.id = req.user._id;
                    b_comment.author.username = req.user.username;
                    b_comment.save()
                    camp.comments.push(b_comment)
                    camp.save()
                    console.log("******************************"+comment)
                    res.redirect("/campgrounds/"+ id);
                }
            })
        }
    })
})

//============================
// Comments Edit Routes
//============================
router.get("/campgrounds/:id/comments/:com_id/edit",authCommentOwner,(req,res)=>{
    var camp = {
        id : req.params.id
    }

    comment.findById(req.params.com_id,(err,fcomment)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcomment)
            res.render('edit_comment',{comment : fcomment ,camp : camp});
        }
    })
})

router.put("/campgrounds/:id/comments/:com_id",authCommentOwner,(req,res)=>{
    comment.findByIdAndUpdate(req.params.com_id,req.body.comment,(err,ncom)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

router.delete('/campgrounds/:id/comments/:com_id',authCommentOwner,(req,res)=>{
    comment.findByIdAndRemove(req.params.com_id,(err)=>{
        res.redirect('back')
    })
})

function authCommentOwner(req , res , next){
    //adding authorization
    if(req.isAuthenticated()){
        comment.findById(req.params.com_id,(err,fcomment)=>{
            if(err){
                res.redirect("back")
            }else{
                if(fcomment.author.id.equals(req.user._id)){
                    next();
                }else{
                    res.redirect("back")
                }
            }
        })

    }else{
        res.redirect("back")
    }
}

function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

module.exports = router