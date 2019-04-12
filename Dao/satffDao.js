let userModel = require('../model/userModel');
let applicationModel = require('../model/applicationModel');
let eventModel = require('../model/eventModel');




let updateSendTo = (criteria,criteria2,callback)=>{
   // console.log(criteria,criteria2)
    applicationModel.updateOne( criteria, { $pop: { sendTo: -1 } },callback );
}


let checkFinalApprove = (criteria,criteria2,callback)=>{
    // console.log(criteria,criteria2)
     applicationModel.findOne( criteria, criteria2,callback );
 }

 let changeApplicationStatus = (criteria,criteria2,callback)=>{
     console.log(criteria,criteria2)
     applicationModel.updateOne( criteria, criteria2, callback );
 }
 let applicationInfo = (criteria,callback)=>{
    // console.log(criteria,criteria2)
     applicationModel.findOne( criteria, callback );
 }

 let findApplication = (criteria,criteria2,callback)=>{
    // console.log(criteria,criteria2)
     applicationModel.find( criteria,criteria2 ,callback );
 }
//=======================================
module.exports = {
    updateSendTo: updateSendTo,
    checkFinalApprove: checkFinalApprove,
    changeApplicationStatus: changeApplicationStatus,
    applicationInfo: applicationInfo,
    findApplication: findApplication
}