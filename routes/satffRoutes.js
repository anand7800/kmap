let satffServices = require('../services/staffServices');


let express = require('express'),
    router = express.Router();


    router.post('/getApplication',(req,res)=>{
        satffServices.getApplication(req.body,req.headers,(err,response)=>{
            if(err) console.log(err,"router error");
            else res.send(response);
        })
    })

    router.post('/approveApplication',(req,res)=>{
        satffServices.approveApplication(req.body,req.headers,(err,response)=>{
            if(err) console.log(err,"router error");
            else res.send(response);
        })
    })

    router.post('/cancleApplication',(req,res)=>{
        satffServices.cancleApplication(req.body,req.headers,(err,response)=>{
            if(err) console.log(err,"router error");
            else res.send(response);
        })
    })

    router.post('/checkinCheckout',(req,res)=>{
        satffServices.checkinCheckout(req.body,req.headers,(err,response)=>{
            if(err) console.log(err,"router error");
            else res.send(response);
        })
    })

    router.post('/approvedList',(req,res)=>{
        satffServices.approvedList(req.body,req.headers,(err,response)=>{
            if(err) console.log(err,"router error");
            else res.send(response);
        })
    })
    module.exports = router;