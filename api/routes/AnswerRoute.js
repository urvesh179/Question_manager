var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var Answer = require("../Services/AnswerService");

router.get('/getAll', Answer.getAll);
router.post('/add',auth,Answer.add);
router.get('/getAllByQuestion/:id', Answer.getAllByQuestion);
router.put('/edit/:id',auth,Answer.edit);
router.delete('/delete/:id',auth,Answer.delete);
router.get('/getById/:id',Answer.getById);


module.exports = router;