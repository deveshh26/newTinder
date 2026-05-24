//  first we create schema ,then we will create mongoose model  ==>mongoose.model("name of model",schema)
 
//schema creation
 const mongoose=require("mongoose")
 const validator=require("validator") //adding schema level validation for email , could have also put database level validation for it also
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
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email address: "+value)
            }
        }


    },
    password:{
        type:String,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("enter a strong password: "+value)
            }
        }
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
        type:String,
        default:"https://imgs.search.brave.com/BJsl2em1KmmDfaB8Qv6PzdlQ8K8YeTz48tFVuTHQc9M/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNDYv/ODk2Lzk3MS9zbWFs/bC93b21hbi13aXRo/LWEtY2FtZXJhLW9u/LWEtYmVhdXRpZnVs/LWJhY2tncm91bmQt/Zm9yLXdvcmxkZ3Jh/cGh5LWRheS1waG90/by5qcGc",
         validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url: "+value)
            }
        }
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
