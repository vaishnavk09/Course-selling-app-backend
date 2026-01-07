const express = require("express")
const app = express()
app.use(express.json())
import {CourseRouter} from "./routes/course.js"
import {userRouter} from "./routes/user.js"


app.use('/api/v1/users',userRouter)
app.use('/api/v1/courses',CourseRouter)













app.listen(3000,()=>{
    console.log("server running on http://localhost:3000");
    
})