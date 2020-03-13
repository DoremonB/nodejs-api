const express=require('express')
const app=express()
const morgan=require('morgan')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const productRoutes=require('./api/routes/products')
const orderRoutes=require('./api/routes/orders')
const userRoutes=require('./api/routes/user')

mongoose.connect('mongodb+srv://rugved:'+process.env.MONGO_ATLAS_PW+'@node-rest-shop-qoquv.mongodb.net/'+process.env.MONGO_DB_NAME+'?retryWrites=true&w=majority',{
    useNewUrlParser: true
})

mongoose.Promise=global.Promise;

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

//making uploads folder publicly available Eg: http://localhost:3000/2020-03-02T19:51:40.674ZLogo.png
// app.use(express.static('uploads'))

//making uploads folder publicly available Eg: http://localhost:3000/uploads/2020-03-02T19:51:40.674ZLogo.png
app.use('/uploads',express.static('uploads'))

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers,Origin,X-Requested-With,Content-Type,AcceptAuthorization')

    if(req.method==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET')
        return res.status(200).json({})
    }
    next()
})

app.use('/products',productRoutes)
app.use('/orders',orderRoutes)
app.use('/users',userRoutes)

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500)
    res.json({
        message:error.message
    }) 
})
module.exports=app