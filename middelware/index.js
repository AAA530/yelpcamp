
var camp = require("../models/camps")
var comment = require("../models/comment")
var user = require("../models/user")

var middelobj = {}

middelobj.authCommentOwner = (req , res , next)=>{
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

middelobj.authCampOwner = (req , res , next)=>{
    //adding authorization
    if(req.isAuthenticated()){
        camp.findById(req.params.id,(err,fcamp)=>{
            if(err){
                res.redirect("back")
            }else{
                if(fcamp.author.id.equals(req.user._id)){
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

middelobj.isLoggedIn = (req ,res ,next)=>{
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

module.exports = middelobj