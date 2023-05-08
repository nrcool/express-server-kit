import {Schema,model} from "mongoose"

//defining user document schema
const userSchema=new Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    password:{type:String,required:true},
})

//creating users collection
const UserCollection=model("users",userSchema)

export default UserCollection;