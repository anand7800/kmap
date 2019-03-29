let studentDao = require('../Dao/studentDao'),
    userDao = require('../Dao/userDao'),
    util =require('../utilities/util')    ;

    let async = require('async'),
        jwt = require('jsonwebtoken') ;



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
				cb(null,{"code":util.statusCode.THREE_ZERO_ZERO,"message":util.statusMessage.INVALID_TOKEN, "error": err});
				return;
            }
				cb(null);
				return;
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
        callback(null,res.applyApplication);
    })
}

let getApplication = (header,callback)=>{
    let token = header.token ;
    async.auto ({
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
        callback(null,res.getApplication);
    })
}

let findPath = (body,header,callback)=>{
    
}

//======================================================================
module.exports = {
    findUser: findUser,
    applyApplication: applyApplication,
    getApplication: getApplication,
    getApplication: getApplication,
    findPath: findPath 

}
