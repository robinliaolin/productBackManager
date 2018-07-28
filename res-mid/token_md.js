let crypto = require("lxj-crypto");
let configFile = require("../config/config");
let userService = require("../service/user");

function isRightToken(token,res) {
    let decryptToken
    try {
        decryptToken = crypto.aesDecrypt(token,configFile.crypto_key);
    }catch (e){
        throw Error("token无效！")
    }

    // let tokenData ={
    //     username:one.username,
    //     expire:Date.now()+configFile.TokenDuration
    // }
    let parseToken = JSON.parse(decryptToken);
    let one = userService.findOne(parseToken.username);
    let isRight=false;
    if(one){
        let expire = parseToken.expire;
        if(expire<Date.now()){
            throw Error("token已过期，请重新登录！")
        }
        isRight=true;
        res.user = one;
    }
    else {
        throw Error("token已失效!")
    }
    return isRight;
}
module.exports = (req,res,next)=>{
    let token = req.query.token;
    let isTokenRight = isRightToken(token,res);
    if (!isTokenRight){
        throw Error("Token已失效，请重新登录！")
    }
    next();
}