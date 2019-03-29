let studentServices = require('../services/studentServices');

let express = require('express'),
    router = express.Router();


router.post('/findUser',(req,res)=>{
   // console.log("=========",req);
    studentServices.findUser(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})


router.post('/applyApplication',(req,res)=>{
    studentServices.applyApplication(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})

router.get('/getApplication',(req,res)=>{
    studentServices.getApplication(req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})

router.post('/findPath',(req,res)=>{
    studentServices.findPath(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})
module.exports = router;
