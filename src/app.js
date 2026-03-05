const express=require('express')
const app=express()  // creating new application of express ...or instance of express js application 

// .use will match all the HTTP method API calls to /route_name
//.get will only handle "GET" call to /route_name
app.use("/user",(req,res)=>{       // make all request i.e 'get' ,'post' etc on "user" and we will only get. "heheheheheheheh". because the order matters and .use and .get have different functionalities
    res.send("heheheheheheheh")
})
app.use("/dev",(req,res)=>{
res.send("hello man you are being listened on server")     //  THIS FUNCTION IS KNOWN AS  REQUEST HANDLER.   //and if only this much is the code , whatever request will come in(written with slash) , only the hello line will be shown
})

app.get("/user",(req,res)=>{
    res.send({firstName: "devesh",  
        lastName:"Mishra"
    })
})

app.use("/hello",(req,res)=>{
res.send("hello  sir you are being listened on server")     
})

app.use("/hello/2",(req,res)=>{
    res.send("hellooo david")
})


// now writing anything apart form /dev or /hello after 3000 will give "cannot get"
//we have to acordingly add response handler for that

app.listen(3000,()=>{
    console.log("server is listening on port 3k sucessfuly")
})


//CODE ORDER/SEQUENCE IS VERY IMPORTANT ...WHENEVER A REQUEST IS RECEIVED ,THE CODE EXECUTION START FROM TOP TO BOTTOM
//order of routes matter a lot


//server created 
//browser is not very good option to test routes.
//"/hello" "/dev".  written above are routes , and then their handlers

//VVVVIMPORTANT =>ROUTES WILL ALSO HANDLE THOSE REQUEST WHICH HAVE SOMETHING WRITTEN AFTER THEM, THATS WHY IF WE CREATE "/" AS ROUTE , IT WILL HANDLE ALL THE REQUEST AND GIVE SAME OUTPUT
// in other words "/hello" this handler will not only handle this , but also everything that comes after slash hello, i.e maybe "/hello/xyz" but that new thing should come after slash or it should be different string

// there need to be response handlers for request , written before "req" in use function with "slash"
// fun fact   hyphen g (-g)while installing nodemon i used to install it at a global level , for all projects , write => sudo npm i -g nodemon
//nodemon makes it live