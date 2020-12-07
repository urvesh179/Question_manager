const { query } = require('express');
var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
var QA = require("../Services/QAService");

router.get('/getAll', QA.getAll);
router.post('/add',auth,QA.add);
router.put('/edit/:id',auth,QA.edit);
router.delete('/delete/:id',auth,QA.delete);

router.get('/getById/:id',QA.getById);
router.post('/addAns/:id',QA.addAns)


module.exports = router;