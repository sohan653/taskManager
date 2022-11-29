const mongoose=require("mongoose");

const bcrypt=require("bcrypt")

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"first name must be needed"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate:{
            validator: (value) =>{
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message:"enter a valid email"
        }
    },
    mobileNumber:{
        type:String,
        required:true,
        validate: {
            validator:(value)=>{
                return /^(?:\+88|88)?(01[3-9]\d{8})$/.test(value)
            },
            message: "enter a bangladeshi number"
        }
    },
    password:{
        type:String,
        minLength:6,
        required:[true,"password must be needed"]
    },
    role:{
        type:String,
        enum:["admin","user"],
        default:"user"
    },
    createDate:{
        type:Date,
        default: Date.now()
    }
},{versionKey:false})


//hashing password before save
UserSchema.pre("save",function (next){
    if (!this.isModified("password")) {
        //  only run if password is modified, otherwise it will change every time we save the user!
        return next();
    }
    const password=this.password;
    const salt=bcrypt.genSaltSync(8)
   const hashPassword = bcrypt.hashSync(password,salt);
   this.password=hashPassword;
   next()
})
const User=mongoose.model("User",UserSchema)
module.exports=User;