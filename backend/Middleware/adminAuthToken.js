import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

const adminAuthenticateToken = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if(!authHeader)return res.status(401).json({message:'No Token Found'})
        const token = authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({message:'No Token Found'})
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({_id: decodedToken.id})
        if(userData){
            if(userData.isAdmin===true){
                req.user=userData
                next()
            }else{
                res.status(403).json({
                    message: 'You do not have permission to access this page'
                })
            }
        }else{
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export default adminAuthenticateToken