var express = require('express');
var path = require('path');
var cors=require("cors");

var User=require('./models/User');
var mongoose= require('mongoose');

var userRoute=require('./routes/UserRoute');
var languageRoute=require('./routes/LanguageRoute');

var app = express();

require('./DBconnection')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoute);
app.use('/language',languageRoute);

app.use('/*',(req,res)=>
{
  res.status(404).send("Url Not Found");
})



 module.exports=app;