//  first we create schema ,then we will create mongoose model  ==>mongoose.model("name of model",schema)
 
//schema creation
 const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({             //without "new" keyword was also fine..?
    firstName: {type:
        String},
    lastName:{
       type: String
    },
    emailID:{
        type:String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String
    }

}) 
//mongoose model creation
const User=mongoose.model("User",userSchema)
module.exports=User // we can also directly write [ module.exports = mongoose.userModel("User",userSchema)]
