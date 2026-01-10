const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()
mongoose.connect(process.env.MONGODB_URL)
const env = process.env
const app = express()
app.use(express.json())


const {courseRouter} = require("./routes/course.js")
const {userRouter} = require("./routes/user.js")
const {adminRouter}= require("./routes/admin.js")



app.use('/api/v1/users',userRouter)
app.use('/api/v1/courses',courseRouter)
app.use('/api/v1/admin',adminRouter)


   
    app.listen(3000);
    console.log("listening on port 3000")











app.listen(env.PORT,()=>{
    console.log("server running on http://localhost:"+env.PORT);
    
})