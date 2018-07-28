
let mongoose = require("mongoose");
let schema = mongoose.Schema({
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "订单Id不能为空！"]
    },
    productName:{
        type: String,
        required:[true, "商品名字不能缺少"]
    },
    productPrice: {
        type: String,
        required: [true, "商品价格不能缺少"]
    },
    count: {
        type: Number,
        required: [true, "商品数量不能为空"],
        min:[1, "商品数量不能小于0"]
    },
    total:{
        type: String
    },
    status: {
        type: String,
        default:"unpay"  // 订单状态: unpay success cancel
    },
    created: {
        type:Date,
        default: Date.now(),
    },
    payTime: {
        type: Date
    },
    cancelTime: Date
});
module.exports = mongoose.model("order",schema);