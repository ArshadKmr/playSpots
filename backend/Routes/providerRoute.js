import express from 'express';
import {
    categoryList,
    providerLogin,
    providerRequest,
    locationList,
    addTurf,
    turfList,
    singleTurf,
    bookingList,
    updateBooking,
    totalBooking,
    totalRevenue,
    totalTurf
} from '../Controller/providerController.js'
import userAuthenticateToken from '../Middleware/userAuthToken.js';
import providerAuthenticateToken from '../Middleware/providerAuthToken.js';

const providerRoute = express()

providerRoute.post('/login', providerLogin)
providerRoute.post('/request', userAuthenticateToken, providerRequest)
providerRoute.get('/category', providerAuthenticateToken, categoryList)
providerRoute.get('/location', providerAuthenticateToken, locationList)
providerRoute.post('/addTurf', providerAuthenticateToken, addTurf)
providerRoute.get('/turfList', providerAuthenticateToken, turfList)
providerRoute.get('/singleTurf/:id', providerAuthenticateToken, singleTurf)
providerRoute.get('/bookingList', providerAuthenticateToken, bookingList)
providerRoute.patch('/booking', providerAuthenticateToken, updateBooking)
providerRoute.get('/totalBooking', providerAuthenticateToken, totalBooking)
providerRoute.get('/totalRevenue', providerAuthenticateToken, totalRevenue)
providerRoute.get('/totalTurf', providerAuthenticateToken, totalTurf)

export default providerRoute