const express=require('express')
const app=express()  // creating new application of express ...or instance of express js application 

app.use("/dev",(req,res)=>{
res.send("hello you are being listened on server")     //  THIS FUNCTION IS KNOWN AS  REQUEST HANDLER.   //and if only this much is the code , whatever request will come in(written with slash) , only the hello line will be shown
})

app.use("/hello",(req,res)=>{
res.send("hello  sir you are being listened on server")     
})

// now writing anything apart form /dev or /hello after 3000 will give "cannot get"
//we have to acordingly add response handler for that

app.listen(3000,()=>{
    console.log("server is listening on port 3k sucessfuly")
})

//server created 


// there need to be response handlers for request , written before "req" in use function with "slash"
// fun fact   hyphen g (-g)while installing nodemon i used to install it at a global level , for all projects , write => sudo npm i -g nodemon
//nodemon makes it live