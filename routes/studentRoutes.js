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


router.post('/createEvent',(req,res)=>{
    studentServices.createEvent(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})

router.post('/eventData',(req,res)=>{
    studentServices.eventData(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})

router.post('/addParticipent',(req,res)=>{
    //console.log(req.body);
    studentServices.addParticipent(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})


router.post('/removeParticipent',(req,res)=>{
    //console.log(req.body);
    studentServices.removeParticipent(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})

router.post('/performanceUpdate',(req,res)=>{
    //console.log(req.body);
    studentServices.performanceUpdate(req.body,req.headers,(err,response)=>{
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

router.post('/likePerformance',(req,res)=>{
    studentServices.likePerformance(req.body,req.headers,(err,response)=>{
        if(err) console.log(err)
        else{
            res.send(response);
        }
    })
})
module.exports = router;
