let util = require('./utilities/util'),
    config = require('./utilities/config').config,
    userRoutes = require('./routes/userRoutes'),
    studentRoutes = require('./routes/studentRoutes');


let app = require('express')(),
    server = require('http').Server(app),
    bodyParser = require('body-parser'),
    http = require('http'),
    https = require('https'),
    mongoose = require('mongoose');

    mongoose.connect(config.MONGO_URI.uri,{ useNewUrlParser: true },(err)=>{
        if(err) console.log(util.statusMessage.DATABASE_CONNECTION_FAILED);
        else console.log(util.statusMessage.DATABASE_CONNECTED);
    });
    
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true }));


    app.use('/user', userRoutes);
    app.use('/student', studentRoutes);

    server.listen(config.NODE_SERVER_PORT.port,()=>{
        console.log("app listing on :", config.NODE_SERVER_PORT.port)
    })