import express from "express";
import {
    insertUser,
    userLogin,
    userTurf,
    turfDetail,
    searchTurf,
    filterTurf,
    paymentRequest,
    bookTurf,
    isBooked,
    bookedTurfs,
    cancelBooking,
    getWalletDetails,
    getWalletAmount,
    bookTurfWallet,
    setNotification,
    getNotification,
    updateNotification
} from '../Controller/userController.js'
import userAuthenticateToken from "../Middleware/userAuthToken.js";
const userRoute = express()


userRoute.post('/register', insertUser)
userRoute.post('/login', userLogin)
userRoute.get('/turf', userTurf)
userRoute.get('/turfDetail/:id', turfDetail)
userRoute.get('/searchTurf/:value', searchTurf)
userRoute.get('/filterTurf/:id', filterTurf)
userRoute.post('/booking/payment/:price', userAuthenticateToken, paymentRequest)
userRoute.post('/turfBooking', userAuthenticateToken, bookTurf)
userRoute.get('/isBooked/:id/:date', userAuthenticateToken, isBooked)
userRoute.get('/booking', userAuthenticateToken, bookedTurfs)
userRoute.post('/booking/wallet', userAuthenticateToken, bookTurfWallet)
userRoute.patch('/booking', userAuthenticateToken, cancelBooking)
userRoute.get('/wallet', userAuthenticateToken, getWalletDetails)
userRoute.get('/wallet/amount', userAuthenticateToken, getWalletAmount)
userRoute.post('/notification', userAuthenticateToken, setNotification)
userRoute.get('/notification', userAuthenticateToken, getNotification)
userRoute.patch('/notification', userAuthenticateToken, updateNotification)

export default userRoute