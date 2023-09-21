import asyncHandler from 'express-async-handler'
import Chat from '../Models/chatModel.js'
import User from '../Models/userModel.js'


export const createChat = asyncHandler(async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const senderId = userId._id.toString()
            const { receiverId } = req.body
            if (receiverId) {
                const chatExist = await Chat.findOne({
                    $and: [
                        { users: { $elemMatch: { $eq: senderId } } },
                        { users: { $elemMatch: { $eq: receiverId } } }
                    ]
                });
                if (chatExist) {
                    res.status(200).json({
                        chatExist
                    });
                } else {
                    const chat = new Chat({
                        users: [senderId, receiverId]
                    })
                    await chat.save();
                    res.status(201).json({ chat })
                }
            } else {
                res.status(400).json({
                    message: 'No receiver found..!'
                })
            }
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})

export const findChat = asyncHandler(async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const senderId = userId._id.toString()
            Chat.find({ users: { $all: [senderId] } })
                .sort({ createdAt: -1 })
                .then(async (result) => {
                    result = await User.populate(result, {
                        path: 'users',
                        select: 'name email',
                    })
                    res.status(200).json({ result })
                })
        } else {
            res.status(400).json({
                message: 'You have to be logged in..!!'
            })
        }
    } catch (error) {
        console.log(error.message)
    }
})