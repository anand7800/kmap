let userModel = require('../model/userModel');
let userDao = require('../Dao/userDao');
let util = require('../utilities/util');
let operation = require('../commonFunction/operation')
var serverUrls = require('../utilities/config');
var config = require('../utilities/config').config;


let jwt = require('jsonwebtoken'),
     async = require('async');

let signup = (data,callback)=> {
   async.auto({
    checkUserExistsinDB : (cb)=>{
        if(!data.id || !data.password || !data.user || !data.email){
            cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
            return;
        }
        var criteria ={
          id : data.id,  
        } 

        userDao.getUsers(criteria,function(err,dbData){
            if(err){
                cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                return
            }
            if(dbData && dbData.lenght!=0){
                cb(null,{"code" : util.statusCode.OK,"message": util.statusMessage.ID_ALREADY_REGISTERED })
            }else{
                cb(null)
            }
        })    
    
       },
    createUser : ['checkUserExistsinDB',(functionData,cb)=>{
        if(functionData && functionData.checkUserExistsinDB){
            cb(null, functionData.checkUserExistsinDB)
            return;
        }
        var criteria = {
            id : data.id,
            password: operation.encryptData(data.password),
            user : data.user,
            email : data.email
        }

        userDao.signup(criteria,(err,dbData)=>{
            if(err){
                cb(null, { "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                return
            }
            cb(null, dbData)
        })

    }]   
   },(err,res)=>{
    callback(null,res)
   })
} 


let login = (data,callback)=> {
    async.auto({
     checkUserExistsinDB : (cb)=>{
         if(!data.id || !data.password){
             cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
             return;
         }
         var criteria ={
           id: data.id,  
           password: operation.encryptData(data.password ),
           token : jwt.sign({ id: data.id }, util.secrate.jwtSecrate, {
            expiresIn: 604800 // expires in 24 hours
        })
         }  
         userDao.updateToken(criteria,function(err,dbData){
             if(err){
                 cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                 return
             }
             else if(dbData != null){

                var user = {
                    id : dbData.id,
                    user : dbData.user,
                    email: dbData.email,
                    token : criteria.token
                }  
             cb(null,user);
             }
             else{
                cb(null,{"code": util.statusCode.OK, "message": util.statusMessage.INCORRECT_ID_PASSWORD})
                return
             }
         })    
     
        }
    },(err,res)=>{
     callback(null,res)
    })
 } 

 let forgotPassword = (data,callback)=> {
     async.auto({
         checkUserExistsinDB : (cb)=>{
             console.log(data);
            if(!data.email){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            var criteria = {
                email : data.email
            }
            userDao.getUsers(criteria,function(err,dbData){
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return
                }
                if(dbData && dbData.lenght!=0){
                    cb(null,{"code" : util.statusCode.OK,"message": util.statusMessage.EMAIL_VERIFIED })
                }else{
                    cb(null,{"code": util.statusCode.OK},{"message": util.statusMessage.EMAIL_NOT_EXISTS})
                    return;
                }
            }) 
         },
         sendOtp : (cb)=>{
            var otp = Math.floor(Math.random()*10000)
            console.log(otp);
            mailOptions = {
                from : serverUrls.serverURLs.dev.EMAIL_USER,
                to : data.email,
                Subject : "forgot password",//util.statusMessage.FORGOT_PASSWORD,
                //localhost:3002/user/forgotPassword
                text : config.FORGOTPASSWORD_LINK.link+"/user/validateOtp?email="+data.email+"&otp="+otp
            }
            operation.sendEmail(mailOptions,(err,mailData)=>{
                if(err){
                    cb(null,{"code": util.statusCode.BAD_REQUEST, "result": err});
                }else{
                    criteria = {
                        email : mailOptions.to,
                        otp : otp
                    }
                    userDao.updateOtp(criteria,(err,dbData)=>{
                        if(err){
                            console.log(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                            return
                        }else if(dbData == null){
                            console.log("email not matched in database");
                        }
                        else{
                            //cb(null);
                            console.log("otp saved ")
                        }  
                    })
                    cb(null,mailData);

                }
            })
         }
         
     },(err,res)=>{
         callback(null,res.sendOtp)
     })
 }

let validateOtp = (query,callback)=>{
    const {email, otp} = query;
    //console.log("query",query,"  emial",email);
    async.auto({
        checkUserExistsinDB : (cb)=>{
            if(!query.email || !query.otp){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            criteria = {
                email : email,
                otp : otp
            }
            userDao.getUsers(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else if(dbData == null){
                    cb(null,{"code":util.statusCode.OK, "message": util.statusMessage.OTP_EXPIRED})
                    return;
                }else{
                    cb(null,dbData);
                }
            })
        },
        updateOtp : (cb)=>{
            criteria = {
                email : email,
                otp : null
            }
            userDao.updateOtp(criteria,(err,dbData)=>{
                if(!query.email || !query.otp){
                    cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                    return;
                }else{
                    cb(null,{"code": util.statusCode.OK, "message": util.statusMessage.SUCCESS});
                }
            })
        }

    },(err,res)=>{
        callback(null,res.updateOtp)
    })
}

let updatePassword = (data, callback)=>{
    const {email,password} = data;
    async.auto({
        checkUserExistsinDB : (cb)=>{
            if(!email || !password){
                cb(null, { "statusCode": util.statusCode.FOUR_ZERO_ONE, "statusMessage": util.statusMessage.PARAMS_MISSING })
                return;
            }
            criteria = {
              toFind : {email : email},
              toSet : {password : operation.encryptData(password)}  
            }
            userDao.updatePassword(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,{"code": util.statusCode.OK,"message": util.statusMessage.PASSWORD_CHANGED});
                }
            })
        }
        
    },(err,res)=>{
        callback(null,res);
    }
    )
}

let updateProfile = (data,header,callback)=>{
    let {name,branch,course,year,sec,mobileNo,permanentAdd,fatherMobileNo,localAddress,localGardian,
        localGardianAddress,dob,subject,post,roomNo,quotes} = data;
    let token = header.token
    //console.log(token);

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
                    cb("err",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
        updateProfile : ['jwtVerify',(functionData,cb)=>{
            console.log("aaaa",functionData.jwtVerify.id)
            criteria = {toSet:{name,branch,course,year,sec,mobileNo,permanentAdd,fatherMobileNo,localAddress,localGardian,
                localGardianAddress,dob,subject,post,roomNo,quotes},
                toFind:{id : functionData.jwtVerify.id}
                }
            userDao.updateProfile(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else{
                    cb(null,{"code" : util.statusCode.OK ,"message" : util.statusMessage.DATA_UPDATED})
                }
            })        
        }]
        


    },(err,res)=>{
        callback(null,res);
    })
}

let viewProfile = (header,callback)=>{
    async.auto({
        jwtVerify : (cb)=>{
			jwt.verify(header.token, util.secrate.jwtSecrate, (err, decoded)=> { 
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
                    cb("err",{"code": util.statusCode.BAD_REQUEST,"meaasge": util.statusMessage.TOKEN_EXPIRED})
                    return;
                }else{
                    cb(null,decoded);
                }
            })
			})
        },
       viewProfile : ['jwtVerify',(functionData,cb)=>{
           var criteria = {
               id : functionData.jwtVerify.id
           }
           userDao.viewProfile(criteria,(err,dbData)=>{
                if(err){
                    cb(null,{ "code" : util.statusCode.THREE_ZERO_ZERO,"message" : util.statusMessage.DB_ERR,"ERROR": err})
                    return;
                }else { 
                    cb(null,dbData);
                }
           })
       }] 
    },(err,res)=>{
        callback(null,res)
    })
}

module.exports = {
    signup:  signup,
    login: login,
    forgotPassword: forgotPassword,
    validateOtp: validateOtp,
    updatePassword : updatePassword,
    updateProfile: updateProfile,
    viewProfile : viewProfile
}