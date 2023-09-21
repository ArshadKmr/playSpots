import React, { useEffect, useRef, useState } from 'react'
import Header from '../UserComponent/Header'
import { Bars3Icon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Dialog } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
import { getUser, getChat, sendMessageAction, setNotification, updateNotification } from '../../Actions/userActions'
import { io } from 'socket.io-client'
import TimeAgo from 'react-timeago'


const ENDPOINT = 'https://playspots.shop'

const Chat = () => {
    const dispatch = useDispatch()
    const socket = useRef()
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState([])
    const [showSearch, setShowSearch] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [newMessages, setNewMessages] = useState('')
    const [currentChat, setCurrentChat] = useState('')

    const chatList = useSelector((state) => state.userChatList)
    const { getUserList, getUserError } = chatList
    const filteredUser = getUserList.result?.filter((user) => user?.users[1]?.name?.toLowerCase().includes(search.toLowerCase()))

    const userChatMessage = useSelector((state) => state.userChatMessage)
    const { getChatMessages, getChatError } = userChatMessage

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const notification = useSelector((state) => state.messageNotification)
    const { notificationError } = notification

    const notifications = useSelector((state) => state.getNotification)
    const { getNotifications } = notifications

    const same = getNotifications[0]?.notification?.map((item) => item.chatId === currentChat[0]?._id)
    const unReadMessageRef = useRef();


    // let unReadMessage
    // useEffect(() => {
    //     if (same === true) {
    //         getNotifications[0]?.notification?.map((item) => dispatch(updateNotification(item._id)))
    //     } else {
    //         unReadMessage = getNotifications[0]?.notification?.filter(item => item.read === false)
    //     }
    // }, [])

    // console.log(unReadMessage[0]?.chatId)
    const chatUserId = JSON.parse(localStorage.getItem('chatUser'))

    useEffect(() => {
        socket.current = io(ENDPOINT)
        socket.current.emit('addUser', userInfo.Id)
    }, [userInfo])

    useEffect(() => {
        // Dispatch action to get old messages here
        dispatch(getChat(chatUserId));
    }, [chatUserId, dispatch]);

    useEffect(() => {
        const chat = getUserList.result?.filter((chat) => chat._id === chatUserId)
        if (chat && chat.length > 0) {
            socket.current.emit('joinRoom', chat[0]?._id);
            setCurrentChat(chat)
        } else {
            console.log('No matching chat found.');
        }
    }, [getUserList.result, chatUserId])

    const chatUser = (chatUserId) => {
        localStorage.setItem('chatUser', JSON.stringify(chatUserId))
        const chat = getUserList.result?.filter((chat) => chat._id === chatUserId)
        socket.current.emit('joinRoom', chat[0]._id)
        dispatch(getChat(chatUserId))
        setMobileMenuOpen(false)
        setCurrentChat(chat)
    }


    const sendMessage = async (chatId, content) => {
        setNewMessages('')
        const data = await dispatch(sendMessageAction(chatId, content))
        socket.current.emit('newMessage', data.message)
        setMessage([...message, data.message])
    }

    const userSendMessage = useSelector((state) => state.userSendMessage)
    const { sendMessageSuccess } = userSendMessage

    useEffect(() => {
        dispatch(getUser())
        setMessage(getChatMessages?.messages)
    }, [dispatch, search, sendMessageSuccess, getChatMessages?.messages])

    const messageContainerRef = useRef(null);

    useEffect(() => {
        if (messageContainerRef.current) {
            messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;
        }
    }, [message])

    const keyDown = (e) => {
        if (e.key === 'Enter' && newMessages.length > 0) {
            sendMessage(currentChat[0]?._id, newMessages)
        }
    }


    useEffect(() => {
        const handleReceiveMessage = (newMessage) => {
            if (newMessage && newMessage.chatId && currentChat[0] && currentChat[0]._id) {
                if (newMessage.chatId._id !== currentChat[0]._id) {
                    dispatch(setNotification(newMessage))
                } else {
                    setMessage((prev) => [...prev, newMessage]);
                }
            }
        };
        socket.current.on('receiveMessage', handleReceiveMessage);
        // Clean up the socket event listener when the component unmounts
        return () => {
            socket.current.off('receiveMessage', handleReceiveMessage);
        };
    }, [currentChat, dispatch]);

    useEffect(() => {
        if (same?.includes(true)) {
            getNotifications[0]?.notification?.map((item) => dispatch(updateNotification(item._id)));
        } else {
            unReadMessageRef.current = getNotifications[0]?.notification?.filter(item => item.read === false);
        }
    }, [same, getNotifications, dispatch]);

    return (
        <>
            <Header />
            <div className="relative flex gap-2 m-3">
                {getUserError || getChatError || notificationError ? (
                    <p className='text-red-600'>{getUserError || getChatError || notificationError}</p>
                ) : (<br />)}
                <div className="w-1/4 p-4 bg-sky-600 rounded hidden lg:block">
                    <div className='relative flex justify-center mb-3'>
                        {!showSearch ? (
                            <>
                                <h1 className=' text-white text-3xl'>All Chats</h1>
                                <button onClick={setShowSearch} className='absolute right-0 top-2.5 text-white'>
                                    <span className="sr-only">Open search</span>
                                    <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </>
                        ) : (
                            <div className='flex relative '>
                                <input type="text" placeholder='Search User'
                                    onChange={(e) => setSearch(e.target.value)}
                                    className='md:w-56 xl:w-64 bg-gray-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' />
                                <button
                                    type="button"
                                    className="absolute right-1.5 top-2.5 rounded-md  text-sky-600"
                                    onClick={() => setShowSearch(false)}>
                                    <span className="sr-only">Close search</span>
                                    <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                </button>
                            </div>
                        )}
                    </div>
                    <hr />
                    <div className='bg-gray-50 mt-5 rounded p-3'>
                        {search?.length > 0 ?
                            filteredUser?.map((item, index) => {
                                const otherUser = item?.users?.find((user) => user?._id !== userInfo?.Id);
                                return (
                                    <div
                                        key={index}
                                        onClick={() => chatUser(item._id)}
                                        className={
                                            currentChat[0]?._id === item._id
                                                ? 'flex justify-between my-3 p-2 bg-emerald-500 rounded'
                                                : 'flex justify-between my-3 p-2 hover:bg-sky-500 hover:rounded'
                                        }
                                    >
                                        <h1 className='bg-white h-10 w-full'>{otherUser?.name}</h1>
                                        {unReadMessageRef.current?.map((msg, index) => msg.chatId === item._id ? (
                                            <span className='bg-red-600 text-white p-1 rounded-full'>{unReadMessageRef.current?.length}</span>
                                        ) : '')}
                                    </div>
                                )
                            }
                            )
                            :
                            getUserList?.result?.map((item, index) => {
                                const otherUser = item?.users?.find((user) => user?._id !== userInfo?.Id);
                                return (
                                    <div
                                        key={index}
                                        onClick={() => chatUser(item._id)}
                                        className={
                                            currentChat[0]?._id === item._id
                                                ? 'flex justify-between my-3 p-2 bg-emerald-500 rounded'
                                                : 'flex justify-between my-3 p-2 hover:bg-sky-500 hover:rounded'
                                        }
                                    >
                                        <div className='w-full flex justify-between rounded p-2'>
                                            <h1 >{otherUser?.name}</h1>
                                            {unReadMessageRef.current?.map((msg, index) => msg.chatId === item._id ? (
                                                <span className='bg-red-600 text-white p-1 rounded-full'>{unReadMessageRef.current?.length}</span>
                                            ) : '')}
                                        </div>
                                    </div>
                                );
                            }
                            )}
                    </div>
                </div>
                <Dialog as="div" className="lg:hidden " open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="absolute inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 left-0 top-40 rounded z-10 w-full overflow-y-auto p-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-sky-600">
                        <div className="flex items-center justify-between">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <div className="p-4 bg-sky-600 rounded">
                                        <div className='relative flex justify-evenly mb-3'>
                                            {!showSearch ? (
                                                <>
                                                    <h1 className=' text-white text-3xl'>All Chats</h1>
                                                    <button onClick={setShowSearch} className='absolute right-0 top-2.5 text-white'>
                                                        <span className="sr-only">Open search</span>
                                                        <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className='flex relative '>
                                                    <input type="text" placeholder='Search User'
                                                        onChange={(e) => setSearch(e.target.value)}
                                                        className='w-64 sm:w-72 bg-gray-100 border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500' />
                                                    <button
                                                        type="button"
                                                        className="absolute right-1.5 top-2.5 rounded-md  text-sky-600"
                                                        onClick={() => setShowSearch(false)}>
                                                        <span className="sr-only">Close search</span>
                                                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                        <hr />
                                        <div className='bg-gray-50 mt-5 rounded p-3'>
                                            {search?.length > 0 ?
                                                filteredUser?.map((item, index) =>
                                                    getUserList?.result?.map((item, index) => {
                                                        // Find the user who is not the logged-in user
                                                        const otherUser = item?.users?.find((user) => user?._id !== userInfo?.Id);
                                                        return (
                                                            <div
                                                                key={index}
                                                                onClick={() => chatUser(item._id)}
                                                                className={
                                                                    currentChat[0]?._id === item._id
                                                                        ? 'flex justify-between my-3 p-2 bg-emerald-500 rounded'
                                                                        : 'flex justify-between my-3 p-2 hover:bg-sky-500 hover:rounded'
                                                                }
                                                            >
                                                                <h1>{otherUser?.name}</h1>
                                                                {unReadMessageRef.current?.map((msg, index) => msg.chatId === item._id ? (
                                                                    <span className='bg-red-600 text-white p-1 rounded-full'>{unReadMessageRef.current?.length}</span>
                                                                ) : '')}
                                                            </div>
                                                        );
                                                    })
                                                )
                                                :
                                                getUserList?.result?.map((item, index) => {
                                                    // Find the user who is not the logged-in user
                                                    const otherUser = item.users.find((user) => user?._id !== userInfo?.Id);
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => chatUser(item._id)}
                                                            className={
                                                                currentChat[0]?._id === item._id
                                                                    ? 'flex justify-between my-3 p-2 bg-emerald-500 rounded'
                                                                    : 'flex justify-between my-3 p-2 hover:bg-sky-500 hover:rounded'
                                                            }
                                                        >
                                                            <h1>{otherUser?.name}</h1>
                                                            {unReadMessageRef.current?.map((msg, index) => msg.chatId === item._id ? (
                                                                <span className='bg-red-600 text-white p-1 rounded-full'>{unReadMessageRef.current?.length}</span>
                                                            ) : '')}
                                                        </div>
                                                    );
                                                }
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
                <div className="w-full p-4 bg-gray-200 rounded flex gap-3 ">
                    <div className="flex relative lg:hidden mr-3">
                        <button
                            type="button"
                            className="-m-2.5 absolute top-2 md:top-3 inline-flex items-center justify-center rounded-md p-2.5 text-blue-500"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-4 w-4 md:h-6 md:w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <header className="w-full rounded">
                        {currentChat?.length > 0 ? (
                            <>
                                <div className="mb-3 rounded">
                                    {currentChat?.map((item, index) => {
                                        const otherUser = item?.users?.find((item) => item._id !== userInfo.Id)
                                        return (
                                            <div key={index} className='flex justify-between'>
                                                <h1 className="text-xl pl-3 md:text-4xl md:pl-8 rounded text-blue-500">{otherUser.name} </h1>
                                            </div>
                                        )
                                    }
                                    )}
                                </div>
                                <div className="bg-white rounded p-2">
                                    <div ref={messageContainerRef} className="bg-white rounded p-2 h-80 overflow-y-auto">
                                        {message?.length > 0 ? (
                                            <div>
                                                {message.map((item, index) => {
                                                    return (
                                                        <div key={index} className="mb-4 ">
                                                            {item?.senderId?._id === userInfo?.Id ? (
                                                                <div className='flex justify-end'>
                                                                    <h1
                                                                        className=" p-3 bg-sky-600/90 w-fit rounded-full text-gray-200"
                                                                    >
                                                                        {item.content}
                                                                    </h1>
                                                                </div>
                                                            ) : (
                                                                <div >
                                                                    <h1 className="p-3 bg-emerald-600/90 w-fit rounded-full text-gray-200" >
                                                                        {item.content}
                                                                    </h1>
                                                                    <TimeAgo date={item.createdAt} className='text-xs font-thin'/>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <h1 className="m-5 h-40 text-center text-orange-600">
                                                No Messages to Show
                                            </h1>
                                        )}
                                    </div>
                                    <div className="my-2 flex">
                                        <div className="w-5/6 flex">
                                            <input
                                                type="text"
                                                placeholder="Enter a message"
                                                className="w-full rounded p-2"
                                                onKeyDown={keyDown}
                                                value={newMessages}
                                                onChange={(e) => setNewMessages(e.target.value)}
                                            />
                                        </div>
                                        {newMessages.length > 0 && (
                                            <button
                                                onClick={() => sendMessage(currentChat[0]?._id, newMessages)}
                                                className="bg-emerald-600 text-gray-200 rounded-full w-20 ml-5 mr-3"
                                            >
                                                Send
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="min-h-full">
                                <h1 className="bg-white text-orange-600 h-40 text-center text-2xl">
                                    Select a chat to start conversation..!
                                </h1>
                            </div>
                        )}
                    </header>
                </div >
            </div >
        </>
    )
}

export default Chat