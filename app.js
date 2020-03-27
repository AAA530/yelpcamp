var express = require('express');
var body_parser = require('body-parser');
var mongoose = require('mongoose'); 
var app = express();

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect("mongodb://localhost/yelp_camp");


app.use(express.static('public')); // This line.
app.use(body_parser.urlencoded({extended : true}))

app.set("view engine","ejs");

//modules are required here
var comment = require('./models/comment')
var camp = require('./models/camps')
var seedDB = require('./seeds')

// seedDB();

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
// Comments Routes
//============================

app.get("/campgrounds/:id/comments/new",(req,res)=>{
    camp.findById(req.params.id).populate("comments").exec((err,fcamp)=>{
        if(err){
            console.log(err);
        }else{
            console.log(fcamp)
            res.render('new_comment',{camp : fcamp});
        }
    })
})

app.post("/campgrounds/:id/comments",(req,res)=>{
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