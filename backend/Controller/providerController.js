import asyncHandler from 'express-async-handler'
import bcrypt from 'bcrypt'
import Provider from '../Models/providerModel.js'
import User from '../Models/userModel.js'
import Category from '../Models/categoryModel.js'
import generateToken from '../Util/token.js'
import cloudinary from '../config/cloudinaryConfig.js'
import Location from '../Models/locationModel.js'
import Turf from '../Models/turfModel.js'
import Booking from '../Models/bookingModel.js'

export const providerLogin = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body
        const userName = req.body.name
        const providerExist = await Provider.findOne({ email })
        if (providerExist.isApproved) {
            if (providerExist) {
                const login = await bcrypt.compare(password, providerExist.password)
                if (login) {
                    const token = generateToken(providerExist._id)
                    res.status(200).json({
                        token,
                        id: providerExist._id,
                        email: providerExist.email,
                        name: userName
                    })
                } else {
                    res.status(400).json({
                        message: "Invalid password"
                    })
                }
            } else {
                res.status(400).json({
                    message: "You are not authorized as a user"
                })
            }
        } else {
            res.status(400).json({
                message: 'You are not approved by the admin'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const providerRequest = asyncHandler(async (req, res) => {
    try {
        const Id = req.user._id.toString()
        const email = req.user.email
        const { password, country, street, state, city, pin, file } = req.body
        const providerExists = await Provider.findOne({ userId: Id })
        if (providerExists) {
            res.status(400).json({
                message: "You are already a provider"
            })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            if (hashed) {
                const image = await cloudinary.uploader.upload(file, {
                    folder: "aadhar",
                });
                const provider = new Provider({
                    userId: Id,
                    email: email,
                    password: hashed,
                    country: country,
                    aadhaar: {
                        public_id: image.public_id,
                        url: image.secure_url
                    },
                    street: street,
                    state: state,
                    city: city,
                    pin: pin
                })
                const providerData = await provider.save()
                if (providerData) {
                    res.status(201).json({
                        providerData
                    })
                } else {
                    res.status(400).json({
                        message: 'something error..Try again later'
                    })
                }
            }
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const categoryList = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const category = await Category.find({ isAvailable: true })
            res.status(200).json({
                category
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const locationList = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const location = await Location.find({ isBlocked: false })
            res.status(200).json({
                location
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const addTurf = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const { name, description, street, city, category, capacity, price, file } = req.body
            const result = await uploadImages(file)
            let images = []
            result.map(async (item) => await images.push({
                public_id: item.public_id,
                url: item.secure_url
            }))
            const values = street.split(',');
            const lat = values[0]
            const lon = values[1]
            const coordinates = { latitude: lat, longitude: lon }
            const streetValues = values.slice(2).join(', ');
            const turf = new Turf({
                vendor: providerId._id.toString(),
                name,
                description,
                category,
                location: streetValues,
                coordinates,
                price,
                district: city,
                capacity,
                image: images
            })
            await turf.save()
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

const uploadImages = asyncHandler(async (images) => {
    try {
        const uploadPromises = images.map(async (item) => {
            const result = await cloudinary.uploader.upload(item, { folder: 'TurfImage' });
            return result;
        });
        const uploadedResults = await Promise.all(uploadPromises);
        return uploadedResults;
    } catch (error) {
        console.log(error.message)
    }
})

export const turfList = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const turfList = await Turf.find({ vendor: providerId._id.toString() }).collation({ locale: 'en', strength: 2 }).sort({ name: 1 })
            if (turfList.length > 0) {
                res.status(200).json({
                    turfList
                })
            }
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const singleTurf = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const { id } = req.params
            const turf = await Turf.findById({ _id: id })
            res.status(200).json({
                turf
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const bookingList = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const id = providerId._id.toString()
            const turfs = await Turf.find({ vendor: id })
            const turfId = turfs.map((item) => item._id.toString())
            const booking = await Booking.find({ turfId: turfId })
            const sortedBooking = booking.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            const userId = sortedBooking.map((item) => item.userId.toString())
            const usersPromise = userId.map((item) => User.find({ _id: item }))
            const nestedUsersPromise = await Promise.all(usersPromise)
            const users = nestedUsersPromise.flat()
            const combinedData = sortedBooking.map((bookingItem, index) => {
                const turfInfo = turfs.find((turf) => turf._id.toString() === bookingItem.turfId.toString());
                return {
                    bookedInfo: bookingItem,
                    turfInfo: turfInfo,
                    userInfo: users[index]
                };
            });
            res.status(200).json({
                combinedData
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const updateBooking = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const booking = await Booking.findById({ _id: req.body.id })
            booking.booking = req.body.status === 1 ? 'Approved' : 'Cancelled'
            await booking.save()
            res.status(201).json({
                booking
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const totalBooking = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const id = providerId._id.toString()
            const turfs = await Turf.find({ vendor: id })
            const turfId = turfs.map((item) => item._id.toString())
            const booking = await Booking.find({ turfId: turfId })
            res.status(200).json({
                booking
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const totalRevenue = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const wallet = providerId.wallet
            res.status(200).json({
                wallet
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const totalTurf = asyncHandler(async (req, res) => {
    try {
        const providerId = req.user
        if (providerId) {
            const turf = await Turf.find({ vendor: providerId._id.toString() })
            res.status(200).json({
                turf
            })
        } else {
            res.status(400).json({
                message: 'You are not authenticated, ID is invalid'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

