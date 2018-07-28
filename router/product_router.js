let express = require("express");
let router = express.Router();
let productService = require("../service/product");
let configFile = require("../config/config");

router.get("/:id",async (req,res)=>{
    let one = await productService.findOneById(req.params.id);
    if (!one){
        throw Error(`${req.params.id}的商品不存在！`)
    }
    res.sucess(one,configFile.findSucess);
})
router.get("/findAll",async (req,res)=>{
    let arr = await productService.findAllProsPage(req.query.page);
    if (arr.length<1){
        throw Error(`第${req.query.page}页的商品不存在！`)
    }
    res.sucess(arr,configFile.findSucess);
})
router.post("/insert",async (req,res)=>{
    let one = await productService.findOneByName(req.body.name);
    if(one)
        throw Error(`${req.body.name}的商品已存入，不可重新存入！`)
    let returnOne = await productService.insert(req.body);
    if (!returnOne){
        throw Error(`${req.body.name}的商品存入失败！`)
    }
    res.sucess(returnOne,configFile.saveSucess);
})
router.post("/update",async (req,res)=>{
    let one = await productService.findOneById(req.body.id);
    if(!one)
        throw Error(`${req.body.id}的商品未找到，更新失败！`)
    let newOne = await productService.updatePro(req.body.id,req.body);
    if (newOne.n<1){
        throw Error(`${req.body.id}的商品更新失败！`)
    }
    let one1 = await productService.findOneById(req.body.id);
    res.sucess(one1,configFile.updateSucess);
})
module.exports = router;