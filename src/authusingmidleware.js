const express=require("express")
const app=express();
  

// Handle auth middleware for all GET , POST ,PATCH ....requests
/*
 const authAdmin=(req,res,next)=>{                               
    console.log("admin auth is getting checked")
    const token="xyza";
    const isAdminAuthorised= token ==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised request");
    }
    else{next();}
}
*/

//this is also a very neat and clear way to use middleware...we can create the function first , maybe in another file , then export it , and then require it (require("adminAuth")) in main file and use that function .then we will just have to write => app.use("/admin",adminAuth)

app.use("/admin",(req,res,next)=>{                               //THIS MIDDLEWARE WILL ONLY BE CALLED FOR "/ADMIN"....MIDDLEWARES ARE VVV IMPORTANT
    console.log("admin auth is getting checked")
    const token="xyza";
    const isAdminAuthorised= token ==="xyz";
    if(!isAdminAuthorised){
        res.status(401).send("unauthorised request");
    }
    else{next();}
})
 app.get("/admin/getAllData",(req,res)=>{
    res.send("all data sent")
 })


app.get("/admin/deleteUser",(req,res)=>{
    res.send("deleted a user")
})





 app.listen(7777,()=>{
    console.log("server is successfully listening on port 7777")
 })