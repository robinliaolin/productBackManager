let mongoose = require("mongoose");
let schema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"用户名不能为空!"],
        unique:[true,"用户名不能重复！"]
    },
    password:{
        type:String,
        required:[true,"密码不能为空！"]
    },
    age:{
        type:Number,
        min:[0,"年龄不能小于0"],
        max:[120,"年龄不能超过120岁"],
        default:10
    },
    role:{
        type:Number,
        default:0
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("User",schema)
