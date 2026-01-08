const express = require("express")
const dotenv = require("dotenv")
const {courseRouter} = require("./routes/course.js")
const {userRouter} = require("./routes/user.js")

dotenv.config()
const env = process.env
const app = express()
app.use(express.json())


app.use('/api/v1/users',userRouter)
app.use('/api/v1/courses',courseRouter)













app.listen(env.PORT,()=>{
    console.log("server running on http://localhost:"+env.PORT);
    
})