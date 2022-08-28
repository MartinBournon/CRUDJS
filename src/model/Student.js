const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const studentSchema = new Schema({
    identification:{
        type: Number,
        required: true 
    },
    firstname:{
        type: String,
        required: true
    },    
    lastname:{
        type: String,
        required: true
    },
    subjects: {
        type: Object,
        required: false
    }

},{collection:'students'});
module.exports = mongoose.model("Student", studentSchema);