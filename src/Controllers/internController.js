const InternModel= require("../models/InternModel")
const CollegeModel= require("../models/CollegeModel")
const createIntern= async function (req, res) {   //In this block create Intership application
    try{
    let data= req.body

    if(!data.collegeId) return res.status(400).send("must provided collegeId")

    let collegeId= await CollegeModel.findById(data.collegeId)

    if(!collegeId) return res.status(400).send("collegeId is not found ")
    
    let savedData= await InternModel.create(data)
    res.status(201).send({msg: savedData})
    }
    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}

module.exports.createintern= createIntern