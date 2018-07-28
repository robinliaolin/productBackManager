let express = require("express");
let router = express.Router();
let configFile = require("../config/config");
let orderService = require("../service/order");
let Big = require("big.js");
let mongoose = require("mongoose");

router.post("/insert",async (req,res)=>{
    req.body.total =Big(req.body.productPrice).times(req.body.count);
    req.body.orderId =new mongoose.Types.ObjectId();
    let one = await orderService.insert(req.body);
    if(!one)
        res.fail(`${req.body.orderId}的订单添加失败！`)
    res.sucess(one,configFile.saveSucess)
})
router.post("/update",async (req,res)=>{
    req.body.total =Big(req.body.productPrice).times(req.body.count);
    let one = await orderService.updateOne(req.body);
    if(!one)
        res.fail(`${req.body.orderId}的订单更新失败！`)
    res.sucess(one,configFile.saveSucess)
})
router.post("/delete",async (req,res)=>{
    let one = await orderService.deleteOne(req.body.orderId);
    res.sucess(one,configFile.saveSucess)
})

module.exports = router;