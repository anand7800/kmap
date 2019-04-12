let userModel = require('../model/userModel');
let applicationModel = require('../model/applicationModel');
let eventModel = require('../model/eventModel');

let findUser = (criteria,criteria2,callback)=>{
   // console.log(criteria);
    userModel.find(criteria,criteria2,callback) 
}

let applyApplication = (criteria,callback)=>{
    applicationModel.create(criteria,callback)
}

let getApplication = (criteria,criteria2,callback)=>{
    applicationModel.find(criteria,{_id :0}).populate({path : 'pertionalInfo',select : {name  :1, id: 1,branch: 1, year: 1, sec: 1, course: 1, mobileNo: 1, permanentAdd: 1, fatherMobileNo: 1, localAddress: 1,
        localGardian: 1, localGardianAddress: 1}}).exec(callback)
}

let createEvent = (criteria,callback)=>{
    eventModel.create(criteria,callback)
}

let pushref = (criteria,criteria2,callback)=>{
    console.log(criteria,criteria2)
    eventModel.updateOne(criteria,{$push: criteria2},callback)
}


let eventData = (criteria,criteria2,callback)=>{
    console.log(criteria);
    eventModel.find(criteria).populate('subEvent').exec(callback)
}


let getevent = (criteria,callback)=>{
//     console.log("===========",criteria)
    eventModel.findOne(criteria,callback)
}


let test = (criteria,criteria2,callback)=>{
   applicationModel.find({'sendTo.0':criteria}).populate({path : 'pertionalInfo',select : {name  :1, id: 1,branch: 1, year: 1, sec: 1, course: 1, mobileNo: 1, permanentAdd: 1, fatherMobileNo: 1, localAddress: 1,
       localGardian: 1, localGardianAddress: 1}}).exec(callback)
}


let removeApplication = (criteria,callback)=>{
        applicationModel.findOneAndDelete(criteria,callback)
    }

//==================================================================//
module.exports = {
    findUser : findUser,
    applyApplication : applyApplication,
    getApplication : getApplication,
    createEvent: createEvent,
    pushref: pushref,
    eventData: eventData,
    getevent: getevent,
    test: test,
    removeApplication: removeApplication
}