let userModel = require('../model/userModel');
let applicationModel = require('../model/applicationModel');

let findUser = (criteria,criteria2,callback)=>{
   // console.log(criteria);
    userModel.find(criteria,criteria2,callback) 
}

let applyApplication = (criteria,callback)=>{
    applicationModel.create(criteria,callback)
}

let getApplication = (criteria,criteria2,callback)=>{
    applicationModel.find(criteria,{_id :0}).populate({path : 'pertionalInfo',select : {name  :1, id: 1,
        branch: 1, year: 1, sec: 1, course: 1, mobileNo: 1, permanentAdd: 1, fatherMobileNo: 1, localAddress: 1,
        localGardian: 1, localGardianAddress: 1}}).exec(callback)
}


//==================================================================//
module.exports = {
    findUser : findUser,
    applyApplication : applyApplication,
    getApplication : getApplication
}