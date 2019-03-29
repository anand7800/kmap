let userServices = require('../services/userServices');

let express = require('express'),
    router = express.Router();


    router.post('/signup',(req,res)=>{
        //console.log(req.body)
        userServices.signup(req.body,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.post('/login',(req,res)=>{
        //console.log(req.body)
        userServices.login(req.body,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.post('/forgotPassword',(req,res)=>{
        //console.log(req.body)
        userServices.forgotPassword(req.body,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.get('/validateOtp',(req,res)=>{
        //console.log(req.body)
        userServices.validateOtp(req.query,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.post('/updatePassword',(req,res)=>{
        //console.log(req.body)
        userServices.updatePassword(req.body,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.post('/updateProfile',(req,res)=>{
        //console.log("aaaaa",req.headers)
        userServices.updateProfile(req.body,req.headers,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })

    router.get('/viewProfile',(req,res)=>{
        //console.log(req.body)
        userServices.viewProfile(req.headers,(err,response)=>{
            if(err) console.log(err)
            res.send(response);
        })
    })


    


    module.exports = router ;