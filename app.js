var express = require('express');
var body_parser = require('body-parser'); 

var app = express();
app.use(express.static('public')); // This line.
app.use(body_parser.urlencoded({extended : true}))

app.set("view engine","ejs");

var camp = [
    {name : "dhiarya" ,image : "https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
    {name : "krisha" ,image : "https://images.unsplash.com/photo-1475778057357-d35f37fa89dd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
]

app.get('/',(req,res)=>{
    res.render("landing")
})

app.get('/campgrounds',(req,res)=>{
    
    res.render("campground",{campground : camp});
});


app.post('/campgrounds',(req,res)=>{
    //to add data to array
    var name = req.body.name;
    var image = req.body.image;
    var n = {name : name ,image:image}
    
    camp.push(n);
    console.log(name);
    res.redirect('/campgrounds');
});

app.get('/campground/new',(req,res)=>{
    res.render('new_camp');
})

app.listen(3000,function(){
    console.log("success!");
})