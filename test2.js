// var mongoose = require('mongoose');
// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');

// var Message = require('./testMOde');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true }));


// mongoose.connect('mongodb://localhost:27017/map',{ useNewUrlParser: true })


// app.post('/addUser',(req,res)=>{


//     var message = new Message({
//         username: "SexySkeletor",
//         text: "Hello World",
//         location: {
//          type: "Point",
//          coordinates: [ -112.110492,36.098948]
//         },
//        });
//       message.save((err, message) => {
//         if (err) console.log(err);
//         console.log(message);
//         res.send(message);
//        });
// })

// app.post('/getUser',(req,res)=>{
//     Message.find({
//         location: {
//          $near: {
//           $maxDistance: 1000,
//           $geometry: {
//            type: "Point",
//            coordinates: [-112.110492,36.098948]
//           }
//          }
//         }
//        }).find((error, results) => {
//         if (error) console.log(error);
//         console.log(JSON.stringify(results, 0, 2));
//         res.send(JSON.stringify(results, 0, 2));
//        });
// })


// app.listen(8080,()=>{
//     console.log("listining on port 8080");
// })
var dbData = {
   post:  "proctor",
   user: "event"
}

if(!dbData || !(dbData.post == "proctor" || dbData.user == "event")){
    console.log("aaaaaaa")
}else{
    console.log(dbData.user)
}