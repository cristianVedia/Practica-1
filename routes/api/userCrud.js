const express = require('express');
var user = require('../../database/users');
var KEYS =user.keys;
const router = express.Router();


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
router.delete("/user",(req, res, next)=>{
    var params = req.query;
    if(params.id==null){
        res.status(300).json({
            "msn":"Faltan parametros"
        });
        return;
    }
    user.remove({_id: params.id}, (err, docs) => {
        if(err){
            res.status(300).json({
                "msn": "No se logro eliminar el registro"
            });
            return
        }
        res.status(300).json(docs)
    });
});
router.patch("/user",(req, res, next) => {
    var params = req.query;
    var data = req.body;
    if (params.id == null){
        res.status(300).json({
            "msn": "Faltan parametros"
        });
        return;
    }
    var objkeys = Object.keys(data);
    for (var i=0; i< objkeys.length; i++){
        if (!checkKeys(objkeys[i])){
            res.status(300).json({
                "msn": "Tus parametros son incorrectos "+ objkeys[i]
            });
            return;
        };
    }
    user.update({_id: params.id}, data).exec((err, docs) => {
        res.status(300).json(docs);
    });
});
    function checkKeys(key){
            for(var j=0; j < KEYS.length; j++){
                if(key== KEYS[j]){
                    return true;
                }
            } 
            return false;
    }
module.exports = router;