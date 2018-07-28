let express = require("express");
let router = express.Router();

let userService = require("../service/user");
let configFile = require("../config/config");

router.post("/login",async (req,res)=>{
    let newVar = await userService.login(req.body);
    console.log(newVar)
    if(newVar)
        res.sucess(newVar,configFile.loginSucess);
    else
        res.fail(Error("登录失败！"))
})

router.post("/register",async (req,res)=>{
    let newVar = await userService.register(req.body);
    console.log(newVar)
    if(newVar)
        res.sucess(newVar,configFile.registerSucess)
    else
        res.fail(Error("注册失败！"))
})

router.get("/:username",async (req,res)=>{
    let newVar = await userService.findOne(req.params.username);
    console.log(newVar)
    if(newVar)
        res.sucess(newVar,configFile.findSucess)
    else
        res.fail(Error("查找失败！"))
})
router.get("/deleteOne/:username",async (req,res)=>{
    let newVar = await userService.deleteOne(req.params.username);
    console.log(newVar.n)
    if(newVar.n===1)
        res.sucess(newVar,configFile.deleteSucess)
    else
        res.fail(Error("删除失败！"))
})
module.exports = router
