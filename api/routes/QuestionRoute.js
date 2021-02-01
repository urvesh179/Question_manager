var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var Question = require("../Services/QuestionService");

router.get('/getAll', Question.getAll);
router.post('/add',auth,Question.add);
router.put('/edit/:id',auth,Question.edit);
router.delete('/delete/:id',auth,Question.delete);
router.get('/getById/:id',Question.getById);
router.post('/getQuestions',Question.getQuestions);

module.exports = router;