let categoryModel = require("../model/category");
let configFile = require("../config/config");

async function find(name) {
    let one = await categoryModel.findOne({name:name});
    if(one){
        return one;
    }
    else {
        throw Error(`${name}的商品分类没找到！`)
    }
}
async function isCategoryExit(name) {
    console.log(name)
    let one = await categoryModel.findOne({name:name});
    return one;
}
async function saveOne(reqBody) {
    let one = await categoryModel.create({name:reqBody.name});
    if(one){
        return one;
    }
    else {
        throw Error(`${reqBody.name}的商品分类保存失败！`)
    }
}
async function updateOne(reqBody) {
    var exit = isCategoryExit(reqBody.name);
    if(!exit){
        throw Error(`${reqBody.name}的分类不存在，无法更新！`)
    }
    let one = await categoryModel.updateOne({name:reqBody.name});
    if(one){
        return one;
    }
    else {
        throw Error(`${reqBody.name}的商品分类更新失败！`)
    }
}
async function deleteOne(name) {
    var exit = isCategoryExit(name);
    if(!exit){
        throw Error(`${name}的分类不存在，无法删除！`)
    }
    let one = await categoryModel.deleteOne({name:name});
    if(one.n>=1){
        return one;
    }
    else {
        throw Error(`${name}的商品分类删除失败！`)
    }
}
async function getCategorysSkipIndex(page) {
    return await categoryModel.find().skip((page-1)*configFile.pageCount).limit(configFile.pageCount).sort("created").select("-__v")
}
module.exports = {
    find,updateOne,deleteOne,saveOne,isCategoryExit,getCategorysSkipIndex
};