var mongoose = require('mongoose');

var campschema = new mongoose.Schema({
    name : String,
    image : String,
    description : String
});

module.exports = mongoose.model("camp", campschema);