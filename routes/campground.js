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


router.post('/campgrounds',(req,res)=>{

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

router.get('/campgrounds/new',(req,res)=>{
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


module.exports = router