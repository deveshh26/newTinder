//we will be using mongoose npm library
const mongoose=require("mongoose")
   const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://devesh-mishra:Q7IipGF07Q03wblt@deveshclus.myxbcsh.mongodb.net/devTinder")  //connecting to the cluster..but this is not a very good way ,,instead use async await
   } 
   //writing some name at the end of the above url , makes it refer to that particular database..without it ,it is referring to entire cluster
   module.exports=connectDB;
    /*connectDB()     //this function returns a promise  
   .then(()=>{
    console.log("database connection established...")  //happy case
   })
   .catch((err)=>{
    console.error("database cannot be connected")      //bad case
   })*/