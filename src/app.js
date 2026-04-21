const express=require('express')
const connectDB=require("./config/database") // for connecting to database 
const app=express()  // creating new application of express ...or instance of express js application 
 const User=require("./models/user")
 app.use(express.json())// now my json middleware will be activated for all the routes
   app.post("/signup", async (req,res)=>{
//console.log(req)
//console.log(req.body)  // important for printing the json data , that you created in postman.


    const user =new User( req.body)             //creating a new instance of User model. // using a new instance of "User" for adding new user to database/// or we are creating new user with above data
    
try{
   await  user.save()  // this function will return a promise ,,basically most of mongoose functions, like to save , fetch data or put on database, all of these functions,methods ,api's return a promise ..so you have to use async  ,await
   res.send("user added successfully")
} catch (err){
    res.status(400).send("ERROR saving the user:"+err.message)
}
    

   });
   
// we have created a  api that is storing dummy  data in databases


 





// .use will match all the HTTP method API calls to /route_name
//.get will only handle "GET" call to /route_name
app.use("/user",[(req,res,next)=>{       // make all request i.e 'get' ,'post' etc on "user" and we will only get. "heheheheheheheh". because the order matters and .use and .get have different functionalities
     //res.send("heheheheheheheh")     // not commenting out this particular line  , will give an error in terminal because we are trying to send another response through same url..but the first response will be sent ,i.e hehehehehe
    next();                        // here too order matters ,position of next() function matters a lot  ...we can add many routes as we want
        
},
(req,res,next)=>{
    console.log("handling the route user 2");           //since there are multiple functions written all over here , so we can also send array of functions. in other words you can wrap all these functions inside an array..done by square brackets after /user
                                                         //app.use("/route",[rh1,rh2],rh3,[rh4]......). any of them can be grouped in array , or put single on array , no problem
   // res.send("2nd response");       
    next();
},
(req,res,next)=>{
    console.log("handling the route user 3");
    res.send("3rd response");
    //next();
},
(req,res,next)=>{
    console.log("handling the route user 4");
    res.send("4rth response");
},
(req,res,next)=>{
    console.log("handling the route user 5");
    res.send("5th response");
}
]
)
app.use("/dev",(req,res)=>{
res.send("hello man you are being listened on server")     //  THIS FUNCTION IS KNOWN AS  REQUEST HANDLER.   //and if only this much is the code , whatever request will come in(written with slash) , only the hello line will be shown
})


//GET/users => it checks all the app.xyz("matching route") function    ... till it gets the response, it will keep going one by one by one from top to bottom to all handler

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

connectDB()     //this function returns a promise  
   .then(()=>{
    console.log("database connection established...")      
    app.listen(3000,()=>{
        console.log("server is listening on port 3000 succesfully")
    })     
     
   })
   .catch((err)=>{
    console.error("database cannot be connected")      //bad case
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