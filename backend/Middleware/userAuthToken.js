import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

const userAuthenticateToken = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No Token Found' })
        const token = authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ message: 'No Token Found' })
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const userData = await User.findOne({ _id: decodedToken.id })
        if (userData) {
            if (userData.isAdmin === true) {
                res.status(401).json({ message: 'You are not authorized to access this' })
            } else {
                if (userData.isBlocked === true) {
                    res.status(204).json({
                        message: 'You are blocked by admin...!!!'
                    })
                } else {
                    req.user = userData
                    next()
                }
            }
        } else {
            res.status(401).json({
                message: 'Invalid token'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export default userAuthenticateToken