const express = require('express');
const router = express.Router();
var user = require('../../database/users');

router.post('/user',function(req,res){
    var params = req.body;
    params["registerDate"]= new Date();
    var userData = new user(params);
    userData.save().then(()=>{
        res.status(200).json({
            "msn":"user registered succesfully"
        });
    });
});
router.get('/user',(req,res,next)=>{

    user.find({}).exec((error,docs)=>{
        if(error)
        {
            res.status(500).json({
                'msn':'cannot complete the operation'
            });
            throw error;
        }
        res.status(200).json(docs);
    });
});
module.exports = router;