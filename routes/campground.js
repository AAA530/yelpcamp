var express = require('express')
var router = express.Router()
var camp = require('./../models/camps')
var comment = require('./../models/comment')


router.get('/',(req,res)=>{
    res.render("landing")
})

router.get('/campgrounds',(req,res)=>{
    camp.find({},(err,camp)=>{
        if(err){
            console.log(err);
        }else{
            res.render("campground",{campground : camp});
        }
    })
});


router.post('/campgrounds',isLoggedIn,(req,res)=>{

    //to add data to array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id : req.user._id,
        username : req.user.username
    }
    var n = {name : name ,image:image , author : author ,description : desc}
    
    camp.create(n , (err,camp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(camp);
            res.redirect('/campgrounds');
        }
    })
});

router.get('/campgrounds/new',isLoggedIn,(req,res)=>{
    res.render('new_camp');
})

router.get('/campgrounds/:id',(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec((err,fcamp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcamp)
            res.render('show',{camp : fcamp});
        }
    })
})

//update campgrounds
router.get('/campgrounds/:id/edit',authCampOwner , (req,res)=>{
    camp.findById(req.params.id,(err,fcamp)=>{
        res.render('camp_edit',{camp : fcamp})
    })
})

router.put('/campgrounds/:id/edit',authCampOwner,(req,res)=>{
    camp.findByIdAndUpdate(req.params.id , req.body.cam , (err,ncamp)=>{
        if(err){
            res.redirect("/campgrounds")
        }else{
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})

router.delete('/campgrounds/:id',authCampOwner,(req,res)=>{
    camp.findByIdAndRemove(req.params.id,(err)=>{
        res.redirect("/campgrounds")
    })
})

function isLoggedIn(req ,res ,next){
    if(req.isAuthenticated()){
        return next()
    }else{
        res.redirect("/login")
    }
}

function authCampOwner(req , res , next){
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

module.exports = router