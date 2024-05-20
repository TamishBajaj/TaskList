const express= require('express');
const app=express();
const cors = require('cors');

const bodyParser = require('body-parser');

const tasks=require('./routes/tasks');
const users=require('./routes/auth');
const connectDB=require('./db/connect')
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error-handler')

// require('dotenv').config()

//middleware
app.use(cors('*'));
app.use(bodyParser.json());
app.use(express.static('./public'))
app.use(express.json())   // If we dont use this we will not have data in req.body()

//routes
// app.use('/api/v1/auth', require('./routes/auth'));
app.use('/api/v1/tasks',tasks)
app.use('/api/v1/users',users)

// When the route doesnot exist
app.use(notFound)
app.use(errorHandlerMiddleware)




const port=process.env.PORT || 3000;


const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log(`Server listening on port ${port} ...`))
    }catch(error){
        console.log(error)
    }

}

start();

