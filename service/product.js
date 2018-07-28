let mongoose = require("mongoose");
let productModel = require("../model/product");
let configFile = require("../config/config");


async function findOneById(productId) {
    let one = await productModel.findOne({_id:productId});
    return one;
}
async function findOneByName(name) {
    let one = await productModel.findOne({name:name});
    return one;
}
async function findAllPros() {
    let arr = await productModel.find();
    return arr;
}
async function findAllProsPage(page) {
    let arr = await productModel.find().skip((page-1)*configFile.pageCount).limit(configFile.pageCount).sort("created").select("-__v");
    return arr;
}

async function updatePro(id,body) {
    let one = await productModel.updateOne({_id:id},body);
    return one;
}

async function insert(body) {
    let one = await productModel.create(body);
    return one;
}
module.exports = {
    findOneById,findOneByName,findAllPros,findAllProsPage,updatePro,insert
}