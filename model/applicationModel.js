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
        default : new Date()
    },
    subject : {
        type : String
    },
    content : {
        type: String
    },
    timeFrom: {
        type : Date,
        default : new Date()
    },
    timeTo : {
        type : Date,
        default : new Date(new Date().setHours( new Date().getHours() + 1 )).toISOString()
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
    },
    status : {
        type: String,
        enum: ["pending","approved","cancled","checkedin","checkedout"],
        default: 'pending'
    }
})

module.exports = mongoose.model('application',applicationSchema,'application');