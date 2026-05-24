const express=require('express')
const connectDB=require("./config/database") // for connecting to database 
const app=express()  // creating new application of express ...or instance of express js application 
 const User=require("./models/user")
 app.use(express.json())// now my json middleware will be activated for all the routes
   app.post("/signup", async (req,res)=>{
//console.log(req)
console.log(req.body)  // important for printing the json data , that you created in postman.


    const user =new User( req.body)   //made signup api very very dynamic // creating a new user from the data i have got from the request // using a new instance of "User" for adding new user to database/// or we are creating new user with above data
    
try{
   await  user.save()  // this function will return a promise ,,basically most of mongoose functions, like to save , fetch data or put on database, all of these functions,methods ,api's return a promise ..so you have to use async  ,await
   res.send("user added successfully")
} catch (err){
    res.status(400).send("ERROR saving the user:"+err.message)
}
    

   });
   //Get user by email
   app.get("/user",async(req,res)=>{
      const userEmail=req.body.emailID;
      try {
         const user=await User.find({emailID:userEmail});
         if(user.length===0){res.status(404).send("USER NOT FOUND")}
         else{
         res.send(user);}

      } catch (err) {
         res.send(400).send("something went wrong");
         
      }
   });

   //Feed API- GET/FEED - get all users from the database
   app.get("/feed",async(req,res)=>{
      try{const user=await User.find({}); // empty object passed so will print all users
         res.send(user)}
   
      catch(err){
         res.send(400).send("something went wrong");
      }
    
      res.send(user)
   })

   //DELETE --API ,to delete user from a database
   app.delete("/user",async(req,res)=>{
      const userId=req.body.userId;
      try {
        // const user=await User.findByIdAndDelete({_id:userID});
   
         const user=await User.findByIdAndDelete(userId)
         res.send("USER DELETED SUCCESSFULLY")
      } catch (err) {
         res.status(404).send("something went wrong");
         
      }
   })

   //UPDATE-API to update data of user in database
   app.patch("/user/:userId",async(req,res)=>{
      const userId=req.params.userId;
      const data=req.body

      
      try {const ALLOWED_UPDATES=["userId","photoUrl","about","gender","age","skills"]
    /*  {"userId":"6a01e29b4eb0e6f1dc12bbee",
        "firstName":"alias",
         "emailID":"alia@gmail.com",
          "xyz":"cetgbvsipjb"
}*/
      const isUpdateAllowed=Object.keys(data).every((k)=>ALLOWED_UPDATES.includes(k))  //says every key should be included in ALLOWED_UPDATES..it is API level validation ,keys not includes in ALLOWED_UPDATES cant be changed or updated
      if(!isUpdateAllowed){
       throw new Error("update not allowed")// now if i will send random fields , the update wont be allowed
      }
      if(data?.skills.length>10){ 
         throw new Error("skills cant be more than 10")
      }

 await User.findByIdAndUpdate({_id:userId},data,{runValidators:true});
         res.send("user updated successfully")
         
         
      } catch (err) {
         res.status(400).send(err.message)
      }
   })
   
   
// we have created a  api that is storing dummy  data in databases
//FEED API-GET/feed-get all the users from the database



 







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
