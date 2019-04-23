let studentDao = require('../Dao/studentDao'),
    userDao = require('../Dao/userDao'),
    util =require('../utilities/util'),
    operation = require('../commonFunction/operation');

    let async = require('async'),
        jwt = require('jsonwebtoken'),
        md5 = require('md5') ;



let findUser = (data,header,callback)=>{
    console.log(data);
    let token = header.token;
    let {user ,name , branch, year,course , id, subject, post} = data;
    

    async.auto({
        checkUserExistsinDB : (cb)=>{
            if(!data.user){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }else{
                cb(null)
            }   
        },    
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        findUser : (cb)=>{
            
            criteria = {user}
            name? criteria['name'] = name: ""
            branch? criteria['branch'] = branch: "" 
            course? criteria['course'] = course: "" 
            year? criteria['year'] = year: ""  
            id? criteria['id'] = id: "" 
            subject? criteria['subject'] = subject: "" 
            post? criteria['post'] = post: "" 

            criteria2 = {password :0,_id : 0,__v:0, token: 0 ,otp: 0};
            studentDao.findUser(criteria,criteria2,(err,dbData)=>{
                //console.log(dbData);
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        }
    },(err,res)=>{
        callback(null,res)
    })
    
}

let applyApplication = (data,header,callback)=>{
    let token = header.token;
    let {applicationType, sendTo, subject, content, timeFrom, timeTo, resion, goingTo} = data;
    async.auto({

        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB : (cb)=>{
            if(!header.token){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }else{
                jwt.verify(token, util.secrate.jwtSecrate, function(err, decoded) {
                    let id = decoded.id;
                    if (err){
                        cb(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                    }else{ 
                        criteria = {
                           id
                        }
                        criteria2 = {
                            _id : 1,id :1
                        }
                        
                       studentDao.findUser(criteria, criteria2, (err,dbData)=>{
                        if(err){
                            cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                            return;
                        }else{
                            cb(null,dbData);
                        }
                       })
                    }
                })
            }   
        },
        applyApplication : ['checkUserExistsinDB',(functionData,cb) => {
            let pertionalInfo = functionData.checkUserExistsinDB[0]._id,
                id = functionData.checkUserExistsinDB[0].id;
            criteria = {applicationNo : Math.floor(Math.random()*10e9),id
                , applicationType, sendTo, subject, content
                 ,timeFrom, timeTo, resion, goingTo, pertionalInfo}
            criteria2 = {}     
            studentDao.applyApplication(criteria, (err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,{"code" : util.statusCode.OK, "message" : util.statusMessage.APPLICATION_SENT, "data": dbData});
                }
            })
        }]

    },(err,res)=>{
        callback(null,res);
    })
}

let getApplication = (header,callback)=>{
    let token = header.token ;
    async.auto ({

        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB : (cb)=>{
            if(!header.token){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }else{
                jwt.verify(token, util.secrate.jwtSecrate, function(err, decoded) {
                    let id = decoded.id;
                    if (err){
                        cb(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                    }else{ 
                        criteria = {
                           id
                        }
                        criteria2 = {
                            _id : 1
                        }
                        
                       studentDao.findUser(criteria, criteria2, (err,dbData)=>{
                        if(err){
                            cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                            return;
                        }else{
                            cb(null,dbData);
                        }
                       })
                    }
                })
            }   
        },
        getApplication : ['checkUserExistsinDB',(functionData,cb)=>{
            let pertionalInfo = functionData.checkUserExistsinDB[0]._id
            var criteria = {pertionalInfo},
                criteria2 = {}

            studentDao.getApplication(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        }]        
    },(err,res)=>{
        callback(null,res);
    })
}

let createEvent = (data, header, callback)=>{
    let token = header.token
    let {eventName, from, to, coordinater, workingMembers, about, eventId,
         eventPassword,parentId} = data
    
    async.auto({
        loginVallidation : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData || !(dbData.post[0] == "proctor" || dbData.user == "event")){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },

        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB : (cb)=>{
            if(!token){
                callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }
                jwt.verify(token, util.secrate.jwtSecrate, function(err, decoded) {
                    if (err){
                        callback(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                    }else{
                        cb(null)
                    }//
                })
        },
        createEvent :['checkUserExistsinDB',(functionData,cb) =>{
            criteria = {
                eventName, from, to, coordinater, workingMembers, about, eventId,
                  eventPassword:md5(eventPassword), parentId
            }

            studentDao.createEvent(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,{"code" : util.statusCode.OK, "message" : util.statusMessage.EVENT_CREATED,"data": dbData});
                }
            })
        }],
        pushref : ['createEvent',(functionData,cb)=>{
            let _id = functionData.createEvent.data._id; 
            if(!_id){
                cb(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }
            if(!_id){
                cb(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }
          let  criteria = { eventId: parentId }
               criteria2 ={subEvent: _id} 

            studentDao.pushref(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,{"code":util.statusCode.OK, "data":dbData});
                }
            })

        }]

    },(err,res)=>{
        callback(null,res);
    })
}

let eventData = (data,header, callback)=>{
    let {eventId} = data,
        token = header.token;
    async.auto({

        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB : (cb)=>{
            if(!header.token){
                //console.log("111111111111");
                callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }else{
                //console.log("222222222222222");

                jwt.verify(header.token, util.secrate.jwtSecrate, function(err, decoded) {
                    if (err){
                        callback(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                    }else{  
                        cb(null)
                    }
                })
            }   
        },
        eventData : ["checkUserExistsinDB", (res, cb)=>{
            //console.log("sssssssssss", res)
            let criteria = {},
            criteria2 = {};
            eventId?criteria['eventId'] = eventId:"";

            studentDao.eventData(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        }]
    },(err,res)=>{
        callback(null, res)
    })

}

let addParticipent = (data, header, callback) =>{
    let {eventId,id,name} = data,
        token = header.token;

    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData || !(dbData.post[0] == "proctor" || dbData.user == "event")){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB : (cb)=>{
            if(!header.token){
                callback(null,{ "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            }else{
                jwt.verify(header.token, util.secrate.jwtSecrate, function(err, decoded) {
                    if (err){
                        callback(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                    }else{  
                        cb(null)
                    }
                })
            }   
        },
        addParticipent : (cb)=>{
            let criteria = {eventId},
                criteria2 = {participent : {id, name}}
            studentDao.pushref(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        } 
    },(err,res)=>{
        callback(null,{"code":util.statusCode.OK,"message": util.statusMessage.PARTICIPENT_ADDED, 
        "data" : res});
    })
    
}

let removeApplication = (data,header,callback)=>{

    let loginInfo,
        token = header.token,
        {applicationNo} =data;


    if(!token ){
        callback(null,{"code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING})
        return;
    }else{
        jwt.verify(header.token, util.secrate.jwtSecrate, function(err, decoded) {
            if (err){
                callback(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN});
                return;
            }
            loginInfo = decoded;
        })
    }      
    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB: (cb)=>{
            criteria = {
                id : loginInfo.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData || dbData.user != "student"){
                    cb("err",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.INVALID_TOKEN})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        },
        removeApplication: (cb)=>{
            criteria = {applicationNo}
            studentDao.removeApplication(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb(null,{"code": util.statusCode.OK, "message":util.statusMessage.APPLICATION_DOES_NOT_EXIST});
                }else{
                    cb(null,{"code": util.statusCode.OK, "message":util.statusMessage.REMOVED});
                }
            })
        }  
    },(err,res)=>{
        callback(null,res.removeApplication);
    })
}



let removeParticipent = (data, header, callback) =>{
    let {eventId,id} = data,
        token = header.token;

    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData || !(dbData.post[0] == "proctor" || dbData.user == "event")){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        removeParticipent : (cb)=>{
            let criteria = {eventId},
                criteria2 = {id}
               
            studentDao.popref(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        } 
    },(err,res)=>{
        callback(null,{"code":util.statusCode.OK,"message": util.statusMessage.PARTICIPENT_ADDED, 
        "data" : res});
    })
    
}

//progress..................................
let performanceUpdate = (data, header, callback) =>{
    let {eventId,id} = data,
        token = header.token;

    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData || !(dbData.post[0] == "proctor" || dbData.user == "event")){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        removeParticipent : (cb)=>{
            let criteria = {eventId},
                criteria2 = {id}
               
            studentDao.popref(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        } 
    },(err,res)=>{
        callback(null,{"code":util.statusCode.OK,"message": util.statusMessage.PARTICIPENT_ADDED, 
        "data" : res});
    })
    
}

let findPath = (data, header, callback)=>{
    let {startPoint, endPoint} = data,
        token= header.token

    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(token, util.secrate.jwtSecrate, (err, decoded)=> { 
               // console.log("ddddddd",decoded)
			if (err){
				cb("null",{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
            criteria = {
                id : decoded.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
       findPath: (cb)=>{
            operation.pathFinder(startPoint, endPoint,(data)=>{
                cb(null, data)
            })
       } 
    },(err,res)=>{
        callback(null,res)
    })

}

let likePerformance = (data, header, callback)=>{
    let {id, eventId} = data
    async.auto({
       likePerformance: (cb)=>{
            criteria={id, eventId}
            
             studentDao.like(criteria,(err, dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }
                cb(null,dbData);
             })
       } 
    },(err,res)=>{
        callback(null,res)
    })

}

//======================================================================
module.exports = {
    findUser: findUser,
    applyApplication: applyApplication,
    getApplication: getApplication,
    getApplication: getApplication,
    createEvent : createEvent,
    eventData: eventData,
    addParticipent: addParticipent,
    removeApplication: removeApplication,
    removeParticipent: removeParticipent,
    performanceUpdate: performanceUpdate,
    findPath: findPath,
    likePerformance: likePerformance
}
