var mongoose = require('mongoose')
const camp = require('./models/camps')
const Comment = require('./models/comment')


var data = [
    {
        name : "First qqqqqqqq",
        image : "https://images.unsplash.com/photo-1504822503375-0db8ca37e40a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci dolore perferendis minima deleniti voluptatibus molestias, officiis a ea in deserunt, similique quia animi. Ipsam a sint eius, minus laudantium dignissimos enim harum repellendus, dolores, impedit aspernatur eaque mollitia! Amet laudantium rerum tempora rem distinctio sapiente nesciunt excepturi aut. Quidem nam dolorum alias minus molestiae fuga totam, explicabo laboriosam in ipsam vitae qui at impedit ullam eveniet! At atque dolor dolorem soluta? Facere recusandae placeat voluptatibus impedit? Dignissimos possimus distinctio, esse voluptatem quas expedita fuga velit laborum ipsa, quasi saepe quia! Accusamus repellendus mollitia debitis sit maxime in tenetur, voluptate odit?",
    },
    {
        name : "Second camp",
        image : "https://images.unsplash.com/photo-1474314170901-f351b68f544f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci dolore perferendis minima deleniti voluptatibus molestias, officiis a ea in deserunt, similique quia animi. Ipsam a sint eius, minus laudantium dignissimos enim harum repellendus, dolores, impedit aspernatur eaque mollitia! Amet laudantium rerum tempora rem distinctio sapiente nesciunt excepturi aut. Quidem nam dolorum alias minus molestiae fuga totam, explicabo laboriosam in ipsam vitae qui at impedit ullam eveniet! At atque dolor dolorem soluta? Facere recusandae placeat voluptatibus impedit? Dignissimos possimus distinctio, esse voluptatem quas expedita fuga velit laborum ipsa, quasi saepe quia! Accusamus repellendus mollitia debitis sit maxime in tenetur, voluptate odit?",
    },
    {
        name : "Third camp",
        image : "https://images.unsplash.com/photo-1470165473874-023613603389?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description : "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci dolore perferendis minima deleniti voluptatibus molestias, officiis a ea in deserunt, similique quia animi. Ipsam a sint eius, minus laudantium dignissimos enim harum repellendus, dolores, impedit aspernatur eaque mollitia! Amet laudantium rerum tempora rem distinctio sapiente nesciunt excepturi aut. Quidem nam dolorum alias minus molestiae fuga totam, explicabo laboriosam in ipsam vitae qui at impedit ullam eveniet! At atque dolor dolorem soluta? Facere recusandae placeat voluptatibus impedit? Dignissimos possimus distinctio, esse voluptatem quas expedita fuga velit laborum ipsa, quasi saepe quia! Accusamus repellendus mollitia debitis sit maxime in tenetur, voluptate odit?",
    }
]



function seedDB(){
    // Remove all campgrounds
    camp.deleteMany({},(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("removed sucessfully")
            //add new data into database
            // data.forEach((seed)=>{
            //     camp.create(seed,(err,camp)=>{
            //         if(err){
            //             console.log(err)
            //         }else{
            //             console.log("camp added");

            //             //add a comment
            //             Comment.create({
            //                 text : "This is a very good campground worth a stay",
            //                 author : "Heisenberg"   
            //             },(err,com)=>{
            //                 if(err){
            //                     console.log(err)
            //                 }else{
            //                     camp.comments.push(com)
            //                     camp.save()
            //                 }
            //             })
            //         }
            //     })
            // })
        }
    })
}

module.exports = seedDB ; 