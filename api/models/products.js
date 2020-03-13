const mongoose=require('mongoose')

// const Order=require('../models/orders')

const productSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    productImage:{type:String, required:true }
})

// productSchema.pre('remove', function(next) {
//     // 'this' is the product being removed. Provide callbacks here if you want
//     // to be notified of the calls' result.
//     Order.remove({product: this._id}).exec().then(res=>{
//         console.log(res)
//     }).catch(err=>{
//         console.log(err)
//     });
//     next();
// });

module.exports=mongoose.model('Product',productSchema)
