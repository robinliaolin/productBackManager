let mongoose = require('mongoose');
let configMsg = require("../config/config");
mongoose.connect(`mongodb://127.0.0.1:27017/${configMsg.db}`)
let connection = mongoose.connection;
connection.on("err",err=>{
    if(err)
        console.log(err.toString())
})
connection.once("open",()=>{
    console.log("数据库连接成功！")
})