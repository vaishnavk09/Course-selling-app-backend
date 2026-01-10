const {Router} = require('express')
const userRouter= Router()
const bcrypt = require("bcryptjs")
const {z} = require("zod")
const {userMiddleware}= require("../middleware/user")
const {JWT_USER_PASWORD}=require("../config")
const jwt= require("jsonwebtoken")
const {userModel, purchaseModel, courseModel}= require("../db")


userRouter.post('/signup', async (req,res)=>{

        try{

        const requiredBody= z.object(
            {
                email:  z.string().email(),
                firstName: z.string().min(3).max(100),
                LastName: z.string().min(3).max(100),
                password:z.string().min(8).max(30).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
            }
        )
        const pasreSuccess= requiredBody.safeParse(req.body)
        if(!pasreSuccess.success)
        {
            return res.status(400).json({
                message:"Invalid request body",
                errors: pasreSuccess.error.errors
            })
        }
        const{email, firstName, LastName, password}= pasreSuccess.data

        const hashedPassword= await bcrypt.hash(password,10)

    await userModel.create({
        email:email,
        password:hashedPassword,
        firstName:firstName,
        LastName:LastName,
    
    })

    res.json({
        message:"user signedin successfully"
    })
     }catch(err)
    {
        res.status(500).json({message: "internal server error"})
    }
})

userRouter.post('/login',async (req,res)=>{
    const {email, password}=req.body

    const user= await userModel.findOne({
        email:email
    })
    if(!user)
    {
        return res.status(400).json({
            message:"user not found"
        })
    }
    const isPasswordValid= bcrypt.compare(password, user.password)
    if(!isPasswordValid)
    {
        return res.status(400).json({
            message:"invalid password"
        })
    }
    const token= jwt.sign({id:user._id}, JWT_USER_PASWORD,)
    res.json({  
        message:"user logged in successfully",
        token:token
    })
})



userRouter.get('/preview',(req,res)=>{

})


module.exports={
    userRouter: userRouter
}