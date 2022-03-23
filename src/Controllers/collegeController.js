const CollegeModel = require("../models/CollegeModel")
const InternModel = require("../models/InternModel")
const createCollegedata = async function (req, res) {  //In this block create college data
    try {
        let data = req.body
        let savedData = await CollegeModel.create(data)
        res.status(201).send({ msg: savedData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}

const getcollegeData = async function (req, res) {   //In this block get college data with college intership candidate
    try {
        let filter = req.query
        if (Object.keys(filter).length == 0) return res.status(400).send({ status: false, msg: "filters are required" })

        let collegename = await CollegeModel.findOne(filter)
        if (!collegename) return res.status(400).send("college not found")

        let college = await CollegeModel.findOne(filter).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
        let intershipData = JSON.parse(JSON.stringify(college))

        let internData = await InternModel.find({ collegeId: college._id }).select({ isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0, collegeId: 0 })
        if (Object.keys(internData).length == 0) return res.status(400).send("interndata not found")

        intershipData.intersts = [...internData]
        res.status(200).send({ status: true, data: intershipData })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }

}
module.exports.createCollegedata = createCollegedata
module.exports.getcollegeData = getcollegeData