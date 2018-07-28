let redis = require("redis");
let util = require("util");
let client = redis.createClient("redis://127.0.0.1:6379");
require("./utils/connectServer")
let productModle = require("./model/product");

let getAsync = util.promisify(client.get).bind(client);
let lpushAsync = util.promisify(client.lpush).bind(client);
let lrangeAsync = util.promisify(client.lrange).bind(client);
let setAysnc = util.promisify(client.set).bind(client);

async function getAsyncDateFromRedis() {
    await setAysnc("key1","a");
    let rel = await getAsync("key1");
    console.log(rel)
}
async function saveDataFromMongDBToRedis() {
    let arr = await productModle.find();
    let key = 'productRedis'
    arr.forEach(async ob =>{
        await lpushAsync(key,JSON.stringify(ob))
    })
    let arrRedis = await lrangeAsync(key,0,-1);
    console.log(arrRedis)
}
// getAsyncDateFromRedis()
saveDataFromMongDBToRedis()