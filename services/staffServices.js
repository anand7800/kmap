let studentDao = require('../Dao/studentDao'),
    userDao = require('../Dao/userDao'),
    staffDao = require('../Dao/satffDao'),
    util = require('../utilities/util');

let async = require('async'),
    jwt = require('jsonwebtoken'),
    md5 = require('md5');


let getApplication = (data, header, callback) => {
    let token = header.token;
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
                }else if(!dbData || dbData.user != "staff"){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB: (cb) => {
            if (!header.token) {
                callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            } else {
                jwt.verify(header.token, util.secrate.jwtSecrate, function (err, decoded) {
                    if (err) {
                        callback(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN });
                    } else {
                        var criteria = { id: decoded.id }
                        var criteria2 = { post: 1 }
                        userDao.getTeacher(criteria, criteria2, (err, dbData) => {
                            if (err) {
                                cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                                return;
                            } else {
                                cb(null, dbData);
                            }
                        })
                    }
                })
            }
        },
        getApplication: ['checkUserExistsinDB', (functionData, cb) => {
            let post = functionData.checkUserExistsinDB.post;
            //console.log('fffffff',post[0]);
            // post =post[0]
            let criteria = {$in: post},
                criteria2 = {}
            studentDao.test(criteria, criteria2, (err, dbData) => {
                if (err) {
                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                    return;
                } else {
                    cb(null, dbData);
                }
            })
        }]
    }, (err, res) => {
        callback(null, res);
    })
}


let approveApplication = (data, header, callback) => {
   var {applicationNo} = data
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
                }else if(!dbData || dbData.user != "staff"){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        checkUserExistsinDB: (cb) => {
            if (!header.token) {
                callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                return;
            } else {
                jwt.verify(header.token, util.secrate.jwtSecrate, function (err, decoded) {
                    if (err) {
                        callback(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN });
                        return;
                    } else {
                        criteria = {applicationNo}
                        criteria2 = {status: 1}
                       staffDao.checkFinalApprove(criteria,criteria2,(err,dbData)=>{
                        if (err) {
                            cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                            return;
                        }else if(!dbData){
                            cb("err",{"code": util.statusCode.OK, "message": util.statusMessage.APPLICATION_DOES_NOT_EXIST})
                        }else if(dbData.status == 'approved' || dbData.status == 'cancled'){
                            cb("err",{"code": util.statusCode.OK, "message": util.statusMessage.ALREADY_APPROVED})
                            return;
                        }else{
                            cb(null)
                        }
                    })
                    }
                })
            }
        },
        pass: (cb)=>{
            criteria = {applicationNo}
            criteria2 = {}

            staffDao.updateSendTo(criteria,criteria2,(err,dbData)=>{
                if (err) {
                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                    return;
                } else {
                    cb(null,{"code":util.statusCode.OK,"message": util.statusMessage.SUCESS, 
                    "data" : dbData});
                }
            })
        },
        approve : (cb)=>{
            criteria = {applicationNo},
            criteria2 = {sendTo: 1}
            staffDao.checkFinalApprove(criteria,criteria2,(err,dbData)=>{
                if (err) {
                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                    return;
                } else if(!dbData.sendT0){
                    criteria = {applicationNo}
                    criteria2 = {status: "approved"}
                   staffDao.changeApplicationStatus(criteria,criteria2,(err,dbData)=>{
                    if (err) {
                        cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                        return;
                    } else{
                        cb({"code": util.statusCode.OK, "message": util.statusMessage.APPROVED,"data":dbData});
                    }
                   })
                }else{
                    cb(null);
                    return;
                }
            })        
        }
    }, (err, res) => {
        callback(null, res);
    })
}





let cancleApplication = (data, header, callback) => {
    var {applicationNo} = data,
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
                }else if(!dbData || dbData.user != "staff"){
                    cb("null",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
         checkUserExistsinDB: (cb) => {
             if (!header.token) {
                 callback(null, { "code": util.statusCode.FOUR_ZERO_ONE, "message": util.statusMessage.PARAMS_MISSING })
                 return;
             } else {
                 jwt.verify(header.token, util.secrate.jwtSecrate, function (err, decoded) {
                     if (err) {
                         callback(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.INVALID_TOKEN });
                         return;
                     } else {
                         criteria = {applicationNo}
                         criteria2 = {status: 1}
                        staffDao.checkFinalApprove(criteria,criteria2,(err,dbData)=>{
                         if (err) {
                             cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                             return;
                         }else if(dbData.status == 'approved' || dbData.status == 'cancled'){
                             cb("err",{"code": util.statusCode.OK, "message": util.statusMessage.ALREADY_APPROVED})
                             return;
                         }else{
                             cb(null)
                         }
                     })
                     }
                 })
             }
         },
         cancle : (cb)=>{
             criteria = {applicationNo},
             criteria2 = {sendTo: 1}
             staffDao.checkFinalApprove(criteria,criteria2,(err,dbData)=>{
                 if (err) {
                     cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                     return;
                 } else if(!dbData.sendT0){
                     criteria = {applicationNo}
                     criteria2 = {status: "cancled"}
                    staffDao.changeApplicationStatus(criteria,criteria2,(err,dbData)=>{
                     if (err) {
                         cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                         return;
                     } else{
                         cb(null,{"code": util.statusCode.OK, "message": util.statusMessage.APPLICATION_CANCLED,"data":dbData});
                     }
                    })
                 }else{
                     cb(null);
                     return;
                 }
             })        
         }
     }, (err, res) => {
         callback(null, res);
     })
 }


 let checkinCheckout = (data,header,callback)=>{

    let loginInfo,
        token = header.token,
        {applicationNo} =data;

    if(!token || !applicationNo ){
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
        checkUserExistsinDB: (cb)=>{
            criteria = {
                id : loginInfo.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("err",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.INVALID_TOKEN})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        },
        applicationInfoo: (cb)=>{
            criteria = {applicationNo}
            staffDao.applicationInfo(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    //console.log("ssssss",dbData);                    
                    cb(null,dbData)
                }
            })
        },
       updateApplicationStatus :[ 'applicationInfoo',(dbData,cb)=>{
           let currentTimeStamp = new Date()
           console.log(currentTimeStamp);
           var statusToSet="";
            let appInfo = dbData.applicationInfoo;
             console.log("appInfo.status",appInfo.status)

            if(appInfo.status == 'approved' && appInfo.timeFrom<= currentTimeStamp){
                statusToSet = "checkedin";
            }else if(appInfo.status == 'checkedin' && appInfo.timeTo >=currentTimeStamp){
                statusToSet = "checkedout";
            }else{
                cb(null,{"code": util.statusCode.BAD_REQUEST, "message": util.statusMessage.CAN_NOT_BE_PROCESSED})
                return;
            }
            criteria = {applicationNo}
            criteria2 = {status: statusToSet}
             staffDao.changeApplicationStatus(criteria,criteria2,(err,dbData)=>{
                if (err) {
                    cb(null, { "code": util.statusCode.THREE_ZERO_ZERO, "message": util.statusMessage.DB_ERR, "ERROR": err })
                    return;
                } else{
                    cb(null,{"code": util.statusCode.OK, "message": statusToSet,"data":dbData});
                 }
            })
            

       }]
    },(err,res)=>{
        callback(null,res.updateApplicationStatus);
    })
}



 let approvedList = (data,header,callback)=>{
    let loginInfo,
    token = header.token,
    {id} =data
    
    if(!token){
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
        checkUserExistsinDB: (cb)=>{
            criteria = {
                id : loginInfo.id,
                token: header.token
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(!dbData){
                    cb("err",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.INVALID_TOKEN})
                    return;
                }else{
                    cb(null);
                }
            })
        },
        getApprovedApplications: (cb)=>{
            criteria={id: id,status : "approved"},
            criteria2 = {applicationNo: 1,_id:0}
            staffDao.findApplication(criteria,criteria2,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else {
                    cb(null,dbData);
                }
            })
        }

    },(err,response)=>{
        callback(null,response);
    })

 }
//=================================================
module.exports = {
    getApplication: getApplication,
    approveApplication: approveApplication,
    cancleApplication: cancleApplication,
    checkinCheckout: checkinCheckout,
    approvedList: approvedList
}