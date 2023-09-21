import asyncHandler from 'express-async-handler'
import Message from '../Models/messageModel.js'
import User from '../Models/userModel.js'
import Chat from '../Models/chatModel.js'

export const sentMessage = asyncHandler(async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const { chatId, content } = req.body
            const message = new Message({
                chatId,
                senderId: userId._id.toString(),
                content
            })
            await message.save()
            await message.populate('senderId', 'name email')
            await message.populate('chatId')
            await User.populate(message, {
                path: 'chatId.users',
                select: 'name email'
            })
            const chat = await Chat.findByIdAndUpdate({ _id: chatId, latestMessage: message })
            res.status(200).json({
                message
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


export const getMessage = asyncHandler(async (req, res) => {
    try {
        const userId = req.user
        if (userId) {
            const { chatId } = req.params
            const messages = await Message.find({ chatId })
                .populate('senderId', 'name email')
                .populate('chatId')
            res.status(200).json({
                messages
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