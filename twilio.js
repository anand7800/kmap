var twilio = require('twilio');
var accountSid='ACe9905e6319ab2051571a09bfd8e9731f';
var authToken='7d46b21421a7e3c346ef203c7d3f31c6';
var client = require('twilio')(accountSid, authToken);

client.messages.create({
        to: '+918299858664',
        from:'+14702033369',
        body:Math.floor(Math.random()*10000)

    }, function(err, message) {
        if(err) console.log(err,"dfghj")
        console.log(message,"fghj");
        process.stdout.write(message.sid);
    });