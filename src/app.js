const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser=require("body-parser");
const studentRoute= require('./route/StudentRoute');

app.use(cors());
app.use(express.json());
app.use(studentRoute);
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(express.static("public"));

module.exports = app;