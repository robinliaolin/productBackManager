let express = require("express");
let router = express.Router();
let categoryService = require("../service/category");
let configFile = require("../config/config");

//查找某个分类
router.post("/find",async (req,res)=>{
    let one = await categoryService.find(req.body.name);
    if(one){
        res.sucess(one,configFile.findSucess)
    }
    else
        throw Error("查询失败！")
})
//添加某个分类
router.post("/save",async (req,res)=>{
    let findedOne = await categoryService.isCategoryExit((req.body.name));
    if(findedOne){
        throw Error("该商品已存入，不可再保存该类商品！")
    }
    let one = await categoryService.saveOne(req.body);
    if(one){
        res.sucess(one,configFile.saveSucess)
    }
    else
        throw Error("保存失败！")
})
//更新某个分类
router.post("/update",async (req,res)=>{
    let one = await categoryService.updateOne(req.body);
    if(one){
        res.sucess(one,configFile.updateSucess)
    }
    else
        throw Error(`${req.body.name}的分类更新失败！`)
})
//删除某个分类
router.post("/delete/:name",async (req,res)=>{
    let one = await categoryService.deleteOne(req.params.name);
    if(one.n>=1){
        res.sucess(one,configFile.deleteSucess)
    }
    else
        throw Error(`${name}的分类删除失败！`)
})
module.exports = router