import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Provider from '../Models/providerModel.js'
dotenv.config()

const providerAuthenticateToken = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ message: 'No Token Found' })
        const token = authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ message: 'No Token Found' })
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        const providerData = await Provider.findById({ _id: decodedToken.id })
        if (providerData) {
            req.user = providerData
            next()
        } else {
            res.status(401).json({ message: 'You are not authorized to access this' })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export default providerAuthenticateToken