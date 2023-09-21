import express from 'express';
import userAuthenticateToken from '../Middleware/userAuthToken.js';
import {sentMessage,getMessage} from '../Controller/messageController.js'

const messageRoute = express()

messageRoute.post('/',userAuthenticateToken,sentMessage)
messageRoute.get('/:chatId',userAuthenticateToken,getMessage)


export default messageRoute