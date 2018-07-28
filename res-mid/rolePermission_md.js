let roles = [
    {
        role:0,
        acessFile:[
            /.*\/order\/.*/,
            /.*\/product\.*/,
            /.*\/category\/.*/
        ]
    },
    {
        role:100,
        acessFile:[
            /.*/
        ]
    }];
function isOkAcess(role,path) {
    let isOk = false;
    roles.forEach(i=>{
       if(i.role===role){
           let acessUrls = i.acessFile;
           acessUrls.forEach(url=>{
               if (url.test(path)){
                   isOk=true;
               }
           })
       }
    });
    return isOk;
}
module.exports= (req,res,next)=>{
    let user = res.user;
    if (user){
        let okAcess = isOkAcess(user.role,req.url());
        if (!okAcess) {
            throw Error("当前用户访问权限不足，请更换账号登录!")
        }
    }
    next()
}