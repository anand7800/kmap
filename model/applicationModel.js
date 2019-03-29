var mongoose = require('mongoose');
let Schema = mongoose.Schema; 

var applicationSchema = mongoose.Schema({
    applicationNo : {
        type : Number
    },
    applicationType : {
        type : String,
        enum : ['application','hostalerGatepass','dayscholarGatepass']
    },
    sendTo : {
        type : [String]
    },
    appiedAt : {
        type : Date,
        default : Date.now
    },
    subject : {
        type : String
    },
    content : {
        type: String
    },
    timeFrom: {
        type : Date
    },
    timeTo : {
        type : Date
    },
    resion : {
        type : String
    },
    goingTo : {
        Type : String
    },
    pertionalInfo: [{ type: Schema.Types.ObjectId, ref: 'user' }],
    id: {
        type : Number
    }
})

module.exports = mongoose.model('application',applicationSchema,'application');