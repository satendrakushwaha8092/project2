const express = require('express');
const router = express.Router();
const internController = require("../Controllers/internController")
const collegeController = require("../Controllers/collegeController")

router.post("/functionup/colleges", collegeController.createCollegedata)  //create college detail

router.get("/functionup/collegeDetails", collegeController.getcollegeData)  //get college detail

router.post("/functionup/interns", internController.createintern)  //create intern

module.exports = router;