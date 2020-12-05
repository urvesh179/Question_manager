var express = require('express');
var router = express.Router();

var auth=require('../middleware/auth');
const Language=require("../Services/LanguageService");

//get all Language
router.get('/getAllLanguage',Language.getAllLanguage);

//get all language by id
router.get("/getLanguageById/:id",Language.getLanguageById);

//add language
router.post("/addLanguage",auth,Language.addLanguage);

//delete language
router.delete("/deleteLanguage/:id",auth,Language.deleteLanguage);

//edit language
router.put("/editLanguage/:id",auth,Language.editLanguage);

module.exports = router;