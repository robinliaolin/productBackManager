require("./utils/connectServer")

let express = require("express");
let app = express();
let configSet = require("./config/config");
let res_SendMid = require("./utils/res_SendMid_util");

require("express-async-errors")


let morgan = require("morgan");
let body_parser = require("body-parser");

//注册morgan插件的中间件
app.use(morgan('combined'))

//注册body-parser中间件,以json格式接收
app.use(body_parser.json())
// //注册body-parser中间件,以application/x-www-form-urlencoded格式接收,只能选其一
// app.use(body_parser.urlencoded({extended:false}))

//注册自定义中间件,有两种方式可实现，其一就是这种自定义res的方法，其二是封装发送成功或失败的方法到一个js文件里
app.use(require("./res-mid/rest_md"))

//注册自定义的用户模块化路由
app.use("/user",require("./router/user_router"))

//注册自定义的分类模块化路由
app.use("/category",require("./router/category_router"))

//注册自定义的商品模块化路由
app.use("/product",require("./router/product_router"))

//注册自定义的订单模块化路由
app.use("/order",require("./router/order_router"))

app.use((err,req,res,next)=>{
    if(err)
        res_SendMid.fail(res,err)
    else 
        next()
})

app.listen(configSet.port)