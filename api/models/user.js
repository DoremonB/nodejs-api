const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:true  ,
        unique:true ,
        match: /^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/
    },
    password:{ type:String, required:true }
    
})


module.exports=mongoose.model('User',userSchema)
