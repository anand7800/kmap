var mongoose = require('mongoose');
let Schema = mongoose.Schema; 

let eventSchema = mongoose.Schema({
    
    eventName : {
        type : String
    },
    from : {
        type : Date
    },
    to : {
        type : Date
    },
    coordinater : {
        type : Number
    },
    workingMembers: {
        type: [String]
    },
    about : {
        type :String
    },
    eventId : {
        type : Number
        },
    eventPassword: {
        type : String
    },
    subEvent: [{ type: Schema.Types.ObjectId, ref: 'event' }],
    participent: [{
        timeOn : {type: Date},
        likes : {type: Number},
        status : {type: Number},
        id : {type: Number},
        name : {type : String}
    }] 
})

module.exports = mongoose.model('event',eventSchema,'event');