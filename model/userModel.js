var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
   id : {
       type : Number,
       minlength : 10,
       maxlength : 10,
   },
   password : {
       type : String
   },
   user : {
        type : String,
        enum : ['student','staff']
   },
   email : {
       type : String,
       //validation pending 
   },
   token : {
       type : String,
       default : null
   },
   otp :{
       type : Number,
       default: null
   },
   name : {
       type :String,
       maxlength: 25
   },
   branch : {
       type: String
   },
   course : {
       type : String
   },
   year : {
       type : Number,
       enum: [1,2,3,4]
   },
   sec: {
       type: String
   },
   mobileNo :{
       type : Number
   },
   permanentAdd : {
       type: String
   },
   fatherMobileNo : {
       type: Number
   },
   localAddress: {
       type: String
   },
   localGardian: {
       type: String
   },
   localGardianAddress: {
       type: String
   },
   dob: {
       type: Date
   },
   subject: {
       type: [String]
   },
   post: {
       type: [String]
    },
   roomNo:{
       type: String
   },
   quotes: {
       type: String
   }
})
module.exports = mongoose.model('user',userSchema,'user');