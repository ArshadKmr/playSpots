import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import User from '../Models/userModel.js'
import generateToken from '../Util/token.js'
import Provider from '../Models/providerModel.js'
import Category from '../Models/categoryModel.js'
import Location from '../Models/locationModel.js'
import Turf from '../Models/turfModel.js'
import Booking from '../Models/bookingModel.js'
import e from 'express'

export const adminLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await User.findOne({ email: email })
        if (admin && admin.isAdmin === true) {
            const compare = await bcrypt.compare(password, admin.password)
            if (compare) {
                const token = generateToken(admin._id)
                res.status(200).json({
                    token,
                    _id: admin._id,
                    name: admin.name,
                    email: admin.email,
                    mobile: admin.mobile,
                })
            } else {
                res.status(400).json({
                    message: 'Invalid password'
                })
            }
        } else {
            res.status(401).json({
                message: 'Not Admin'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const adminUsersList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const users = await User.find({ isAdmin: false })
            res.status(200).json({
                users
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})


export const adminProvidersList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const providers = await Provider.find()
            let userId = providers.map(provider => provider.userId.toString())
            let user = []
            for (let i = 0; i < userId.length; i++) {
                user[i] = await User.findById({ _id: userId[i] })
            }
            res.status(200).json({
                providers,
                user
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const adminProviderApproval = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const provider = await Provider.findById(req.params.id)
            provider.isApproved = (req.body.action === 1 ? true : false)
            await provider.save()
            return res.status(200).json({ success: true });
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const adminAddCategory = asyncHandler(async (req, res) => {
    try {
        const { name } = req.body
        const adminId = req.user
        if (adminId) {
            const categoryExist = await Category.findOne({ name: name.toUpperCase() })
            if (categoryExist) {
                res.status(409).json({
                    message: 'Category already exists'
                })
            } else {
                const category = new Category({
                    name: name.toUpperCase()
                })
                await category.save()
                res.status(200).json({
                    category
                })
            }
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const adminCategoryList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const category = await Category.find()
            res.status(200).json({
                category
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message);
    }
})

export const adminCategoryAction = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const { id, status } = req.body
            const category = await Category.findById({ _id: id })
            category.isAvailable = status === 1 ? true : false
            await category.save()
            res.status(200).json({
                category
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminAddLocation = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        const { location } = req.body
        if (adminId) {
            const locationExist = await Location.findOne({ location: location.toUpperCase() })
            if (locationExist) {
                res.status(409).json({
                    message: 'Location already exists'
                })
            } else {
                const newLocation = new Location({
                    location: location.toUpperCase()
                })
                await newLocation.save()
                res.status(200).json({
                    newLocation
                })
            }
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminLocationList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const location = await Location.find()
            res.status(200).json({
                location
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminLocationAction = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const { id, status } = req.body
            const location = await Location.findById({ _id: id })
            location.isBlocked = status === 0 ? true : false
            await location.save()
            res.status(200).json({
                location
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminTurfList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const turfList = await Turf.find()
            res.status(200).json({
                turfList
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminTurfAction = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const { id, status } = req.body
            const turf = await Turf.findById({ _id: id })
            turf.isBlocked = status === 0 ? true : false
            await turf.save()
            res.status(200).json({
                turf
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminUsersAction = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const { id, status } = req.body
            const user = await User.findById({ _id: id })
            user.isBlocked = status === 0 ? true : false
            await user.save()
            res.status(200).json({
                user
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

export const adminBookingList = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const booking = await Booking.find({})
            const sortedBooking = booking.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            //collect the id of the users from booking model
            const userId = sortedBooking.map((item) => item.userId.toString())
            const userPromise = userId.map((item) => User.find({ _id: item }))
            const nestedUser = await Promise.all(userPromise)
            //collect the data of the users who booked the turfs
            const users = nestedUser.flat()
            //collect the id of the turfs from booking model
            const turfId = booking.map((item) => item.turfId.toString())
            const turfPromises = turfId.map((item) => Turf.find({ _id: item }))
            const nestedTurfs = await Promise.all(turfPromises);
            //collect the turf data which users booked
            const turfs = nestedTurfs.flat();
            //collect the id of the vendors who provider the turfs which is booked
            const vendorId = turfs.map((item) => item.vendor.toString())
            const vendorPromise = vendorId.map((item) => Provider.find({ _id: item }))
            const nestedVendors = await Promise.all(vendorPromise);
            //collect the data of the vendors 
            const vendors = nestedVendors.flat();
            //collecting vendor names from user model
            const vendorUserId = vendors.map((item) => item.userId.toString())
            const vendorNamePromise = vendorUserId.map((item) => User.find({ _id: item }))
            const nestedVendorName = await Promise.all(vendorNamePromise)
            const vendorName = nestedVendorName.flat()
            //combine the whole data into a single data
            const combinedData = booking.map((bookingItem, index) => ({
                booking: bookingItem,
                user: users[index],
                turf: turfs[index],
                vendor: vendors[index],
                vendorName: vendorName[index]
            }));
            res.status(200).json({
                combinedData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminRevenue = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const adminData = await User.findOne({ isAdmin: true })
            const revenue = adminData.wallet
            res.status(200).json({
                revenue
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminUserCount = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const userData = await User.find({ isAdmin: false })
            const userCount = userData.length
            res.status(200).json({
                userCount
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminProviderCount = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const providerData = await Provider.find()
            res.status(200).json({
                providerData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminBookingCount = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const bookingData = await Booking.find()
            res.status(200).json({
                bookingData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminTurfCount = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const turfData = await Turf.find()
            res.status(200).json({
                turfData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminGraphBooking = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const bookingData = await Booking.find()
            res.status(200).json({
                bookingData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const adminGraphUser = asyncHandler(async (req, res) => {
    try {
        const adminId = req.user
        if (adminId) {
            const userData = await Turf.find()
            res.status(200).json({
                userData
            })
        } else {
            res.status(400).json({
                message: 'Admin not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})