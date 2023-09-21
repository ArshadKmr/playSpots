import express from 'express';
import {
    adminLogin,
    adminUsersList,
    adminProvidersList,
    adminProviderApproval,
    adminAddCategory,
    adminCategoryList,
    adminCategoryAction,
    adminAddLocation,
    adminLocationList,
    adminLocationAction,
    adminTurfList,
    adminTurfAction,
    adminUsersAction,
    adminBookingList,
    adminRevenue,
    adminUserCount,
    adminProviderCount,
    adminBookingCount,
    adminTurfCount,
    adminGraphBooking,
    adminGraphUser
} from '../Controller/adminController.js'
import adminAuthenticateToken from '../Middleware/adminAuthToken.js';
const adminRoute = express()


adminRoute.post('/login', adminLogin)
adminRoute.get('/users/list', adminAuthenticateToken, adminUsersList)
adminRoute.patch('/user', adminAuthenticateToken, adminUsersAction)
adminRoute.get('/providers/list', adminAuthenticateToken, adminProvidersList)
adminRoute.patch('/providers/approval/:id', adminAuthenticateToken, adminProviderApproval)
adminRoute.post('/category/addcategory', adminAuthenticateToken, adminAddCategory)
adminRoute.get('/category', adminAuthenticateToken, adminCategoryList)
adminRoute.patch('/category', adminAuthenticateToken, adminCategoryAction)
adminRoute.post('/location', adminAuthenticateToken, adminAddLocation)
adminRoute.get('/location', adminAuthenticateToken, adminLocationList)
adminRoute.patch('/location', adminAuthenticateToken, adminLocationAction)
adminRoute.get('/turfList', adminAuthenticateToken, adminTurfList)
adminRoute.patch('/turfList', adminAuthenticateToken, adminTurfAction)
adminRoute.get('/booking', adminAuthenticateToken, adminBookingList)
adminRoute.get('/revenue', adminAuthenticateToken, adminRevenue)
adminRoute.get('/userCount', adminAuthenticateToken, adminUserCount)
adminRoute.get('/providerCount', adminAuthenticateToken, adminProviderCount)
adminRoute.get('/totalBooking', adminAuthenticateToken, adminBookingCount)
adminRoute.get('/turfCount', adminAuthenticateToken, adminTurfCount)
adminRoute.get('/graph/booking', adminAuthenticateToken, adminGraphBooking)
adminRoute.get('/graph/user', adminAuthenticateToken, adminGraphUser)

export default adminRoute