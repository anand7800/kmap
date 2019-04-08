let userModel = require('../model/userModel');
let expireModel = require('../model/expireModel')

let getUsers = function(criteria,callback){
    userModel.findOne(criteria,callback)
}

let signup = function(criteria,callback){
    userModel.create(criteria,callback);
}

let login = function(criteria,callback){
    userModel.findOne(criteria,{password :0,_id : 0,__v:0, token: 0 }, callback)
}

let updateToken = function(criteria,callback){
   // console.log("aaaaaaaaaaa",criteria);
    userModel.findOneAndUpdate({id: criteria.id, password: criteria.password},{$set: {token: criteria.token}}, callback);
}

let updateOtp = function(criteria,callback){
    // console.log("aaaaaaaaaaa",criteria);
     userModel.findOneAndUpdate({email: criteria.email},{$set: {otp: criteria.otp}}, callback);
 }


 let updatePassword = function(criteria,callback){
   // console.log("aaaaaaaaaaa",criteria);
    userModel.findOneAndUpdate(criteria.toFind,{$set: criteria.toSet}, callback);
}

let updateProfile = function(criteria,callback){
    // console.log("aaaaaaaaaaa",criteria);
     userModel.findOneAndUpdate(criteria.toFind,{$set: criteria.toSet}, callback);
}

let viewProfile = function(criteria,callback){
    userModel.findOne(criteria,{password :0,_id : 0,__v:0, token: 0 ,otp: 0}, callback)
}


let getTeacher = function(criteria,criteria2,callback){
    userModel.findOne(criteria,criteria2, callback)
}

//=============================================================
module.exports = {
    getUsers : getUsers,
    signup: signup,
    login : login,
    updateToken: updateToken,
    updateOtp: updateOtp,
    updatePassword : updatePassword,
    updateProfile: updateProfile,
    viewProfile: viewProfile,
    getTeacher: getTeacher 
}