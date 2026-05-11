//  first we create schema ,then we will create mongoose model  ==>mongoose.model("name of model",schema)
 
//schema creation
 const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({             //without "new" keyword was also fine..?
    firstName: {type:
        String,
    required:true},
    lastName:{
       type: String,
       required:true,
       minlength:4

    },
    emailID:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true

    },
    password:{
        type:String
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        validate(value){
if(!["male","female","others"].includes(value)){
    throw new Error("Gender data is not valid");
}
        }
    },
    photoUrl:{
        type:String
    },
    about:{
        type:String,
        default:"This is a default about of the user"
    },
    skills:{
        type:[String]
    },

},
{ timestamps: true
       
    }
) 
//mongoose model creation
const User=mongoose.model("User",userSchema)
module.exports=User // we can also directly write [ module.exports = mongoose.userModel("User",userSchema)]
