module.exports = (req,res,next)=>{
    //如果有需要拦截的网站，那么直接用res_SendMid调用成功或失败的方法
    // res_SendMid.sucess(res,{})
    res.sucess=(data,msg)=>{
        res.send({
            code:0,
            data:data,
            msg:msg
        })
    }
    res.fail = (err)=>{
        res.send({
            code:-1,
            msg:err.toString()
        })
    }
    next()
}