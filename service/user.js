let mongoose = require("mongoose");
let User = require("../model/user");
let crypto = require("lxj-crypto");
let configFile = require("../config/config");

async function register(reqBody) {
    // let key =configFile.crypto_key
    let key = reqBody.username;
    let passwordCrypto = crypto.sha1Hmac(reqBody.password,key);

    let one = await User.findOne({username:reqBody.username});
    if(one){
        throw Error("该账号已被注册，可以去登录！")
        res.fail(Error("账号已注册！"))
    }

    let newVar = await User.create({
        username:reqBody.username,
        password:passwordCrypto,
        age:reqBody.age
    });
    newVar.password="";
    console.log(newVar)
    if(newVar){
        return newVar
    }
    else {
        throw Error("注册失败！")
    }
}
async function login(reqBody) {
    let key = reqBody.username
    let passwordSha1 = crypto.sha1Hmac(reqBody.password,key);
    let one = await User.findOne({username:reqBody.username,password:passwordSha1}).select("-__v -password");
    one.password="";
    //利用aes加密生成token返回给客户端
    if(one){
        let tokenData ={
            username:one.username,
            expire:Date.now()+configFile.TokenDuration
        }
        return crypto.aesEncrypt(JSON.stringify(tokenData),configFile.crypto_key)
    }
    else
        throw Error("登录失败！")
}

async function deleteOne(username) {
    let one =await User.deleteOne({username:username});
    if(one.n>=1){
        return one
    }
    else 
        throw Error("删除失败！")
}
async function findOne(username) {
    let one =await User.findOne({username:username}).select("-__v -password");
    if(one){
        return one
    }
    else
        throw Error("查找失败！")
}

module.exports = {
    login,register,findOne,deleteOne
}