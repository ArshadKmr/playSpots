import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import userRoute from './Routes/userRoute.js'
import adminRoute from './Routes/adminRoute.js';
import vendorRoute from './Routes/providerRoute.js'
import chatRoute from './Routes/chatRoute.js'
import messageRoute from './Routes/messageRoute.js'
import connectDB from './config/db.js';
import { Server } from "socket.io";

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}


const app = express()
const port = 3001
app.use(express.json({ limit: '50mb' }))
app.use(cors())

app.use('/', userRoute)
app.use('/admin', adminRoute)
app.use('/provider', vendorRoute)
app.use('/chat', chatRoute)
app.use('/message', messageRoute)


const server = app.listen(port, () => console.log(`listening on port ${port}!`))
connectDB()


const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

io.on("connection", (socket) => {

    socket.on('addUser', (userData) => {
        socket.join(userData)
        socket.emit('connected')
    })

    socket.on('joinRoom', (room) => {
        socket.join(room)
    })

    socket.on('newMessage', (message) => {
        socket.to(message.chatId._id).emit('receiveMessage',message)
    })
})
