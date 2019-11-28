const express = require('express');
const router = express.Router();
var user = require('../../database/users');

router.post('/user',function(req,res){
    var params = req.body;
    var userData = new user(params);
    userData.save().then(()=>{
        res.status(200).json({
            "msn":"user registered succesfully"
        });
    });
});
module.exports = router;