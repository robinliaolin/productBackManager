let mongoose = require("mongoose");
let schema = mongoose.Schema({
    name:{
        type:String,
        required:[true,"商品分类名称不能少"],
        unique:[true,"商品分类名称不能重名"]
    },
    created:{
        type:Date,
        default:Date.now()
    }
});

module.exports = mongoose.model("Category",schema);