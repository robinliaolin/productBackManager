function sucess(res,data) {
    res.send({
        code:0,
        data:data,
        msg:"成功返回数据！"
    })
}
function fail(res,err) {
    res.send({
        code:-1,
        msg:err.toString()
    })
}
module.exports = {
    sucess,fail
}