var mongoose=require('mongoose');

var expireSchema=new mongoose.Schema({
createAt:{type:Date,default:Date.now,expires:'5m'},
email : {
    type : String
},
otp : {
    type : Number
}
});
module.exports=mongoose.model('expire',expireSchema,'expire');