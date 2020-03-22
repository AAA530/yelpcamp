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

var campschema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
});

var camp = mongoose.model("camp", campschema);

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
    var n = {name : name ,image:image}
    
    camp.create(n , (err,camp)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/campgrounds');
        }
    })
});

app.get('/campgrounds/new',(req,res)=>{
    res.render('new_camp');
})

app.get('/campgrounds/:id',(req,res)=>{
    res.send("this id");
})

app.listen(3000,function(){
    console.log("success!");
})