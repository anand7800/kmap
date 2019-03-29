var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var md5 = require('md5');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));

mongoose.connect('mongodb://localhost:27017/anup',{ useNewUrlParser: true },(err,con)=>{
    if(err) console.log(err)
    else console.log("user connected");
})

var userSchema = mongoose.Schema({
    name : String,
    password : String
})

var questionSchema = mongoose.Schema({
    question : String,
    answer : {
        type: Number,
        enum : [1,2,3,4]
    },
    qno : Number
})

var userModel = mongoose.model('anup',userSchema,'anup');
var questionModel = mongoose.model('question',questionSchema,'question');


app.post('/signup',(req,res)=>{
    var addUser = {
        name : req.body.name,
        password : md5(req.body.password),
    }

   userModel.findOne({name : addUser.name},(err,dbData1)=>{
       if(err) console.log("err");
       else if(dbData1!=null){
           res.send("username alredy exist");
       }else{
           userModel.create(addUser,(err,dbData)=>{
               if(err) console.log(err)
               else res.send(dbData);
           })
       }
   })
})

app.post('/login',(req,res)=>{
    var findUser = {
        name : req.body.name,
        password : md5(req.body.password)
    }
    userModel.findOne(findUser,{password: 0},(err,dbData)=>{
        if(err) console.log(err)
        else res.send(dbData);
    })
})

app.post('/insertQuestion',(req,res)=>{
    var addQue = {
        question : req.body.question,
        answer : req.body.answer,
        qno : req.body.qno
    }
    questionModel.create(addQue,(err,dbData)=>{
        if(err) console.log("err")
        else {console.log(dbData);
                res.send('question inserted');
        }
    })
    
})

app.post('/checkAnswer',(req,res)=>{
    var findQue = {
        answer : req.body.answer,
        qno : req.body.qno
    }
    questionModel.findOne(findQue,(err,dbData)=>{
        if(err) console.log("err")
        else if(dbData == null){
            res.send("roung answer");
        }else{
            res.send("correct answer");
        }
    })
})


app.listen(8080,()=>{
    console.log("server running on port  8080");
})