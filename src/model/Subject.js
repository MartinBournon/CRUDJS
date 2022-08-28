const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const subjectSchema = new Schema({
    subjectName:{
        type: String,
        required: false
    }
},{collection:'subjects'});
module.exports = mongoose.model("Subject", subjectSchema);