const mongoose = require("./connect");

var userSchema = new mongoose.Schema({
    user:String,
    password:String,
    name:String,
    email:String,
    role:String,
    phone:String
});
var USER=mongoose.model('User',userSchema);
module.exports=USER;