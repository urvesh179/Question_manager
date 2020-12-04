var express = require('express');
var router = express.Router();

var user = require("../Services/UserService");

router.post("/add",user.addUser);


router.post("/login",user.login);

module.exports=router;