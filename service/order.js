let orderService = require("../model/order");


async function findOne(orderId) {
    let one = await orderService.findOne({orderId:orderId});
    return one;
}
async function deleteOne(orderId) {
    let one = await orderService.deleteOne({orderId:orderId});
    if(one.n<1){
        throw Error(`${orderId}的订单删除失败！`)
    }
    return one;
}
async function insert(body) {
    let one = await findOne(body.orderId);
    if(one){
         await updateOne(body);
    }
    let newOne = await orderService.create(body);
    return newOne;
}
async function updateOne(body) {
    let result = await orderService.updateOne({orderId:body.orderId},body);
    if (result.n<1){
        throw Error(`${body.orderId}的订单更新失败!`)
    }
    let newOne = await findOne(body.orderId);
    return newOne;
}
module.exports = {
    findOne,insert,deleteOne,updateOne
}