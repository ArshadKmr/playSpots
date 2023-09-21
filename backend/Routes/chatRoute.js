import express from 'express';
import { createChat, findChat } from '../Controller/chatController.js'
import userAuthenticateToken from '../Middleware/userAuthToken.js';
const chatRoute = express()



chatRoute.post('/createChat',userAuthenticateToken, createChat)
chatRoute.get('/allChat',userAuthenticateToken, findChat)

export default chatRoute