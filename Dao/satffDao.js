let userModel = require('../model/userModel');
let applicationModel = require('../model/applicationModel');
let eventModel = require('../model/eventModel');




let updateSendTo = (criteria,criteria2,callback)=>{
   // console.log(criteria,criteria2)
    applicationModel.updateOne( criteria, { $pop: { sendTo: -1 } },callback );
}





//=======================================
module.exports = {
    updateSendTo: updateSendTo
}