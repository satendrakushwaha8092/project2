const mongoose = require("mongoose")
require('mongoose-type-email');
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: 'name is required'
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    mobile: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        unique: true,
        required: 'mobile number is required',
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'college id is required',
        ref: "College"
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
module.exports = mongoose.model("Intern", internSchema);
