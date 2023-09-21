import React, { useEffect, useState } from 'react'
import Header from './Header'
import { StarIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createChat, getWalletAmount, isBooked, bookTurfWallet } from '../../Actions/userActions'
import Maps from '../Maps/Map'
import toast, { Toaster } from 'react-hot-toast';

const reviews = { href: '#', average: 4, totalCount: 117 }
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Booking = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [team, setTeam] = useState(null)
    const [date, setDate] = useState(new Date())
    const [payment, setPayment] = useState('Select Payment Method')
    const [walletPayment, setWalletPayment] = useState(false)

    const userTurfDetail = useSelector(state => state.userSingleTurf)
    const { singleTurf, error } = userTurfDetail

    const isTurfBooked = useSelector(state => state.isTurfBooked)
    const { bookedError, bookedTurf } = isTurfBooked

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const walletAmount = useSelector((state) => state.userWalletAmount)
    const { userWalletAmount, walletAmountError } = walletAmount

    const handleBooking = (price, id) => {
        if (date <= new Date()) {
            const error = document.getElementById('error')
            error.innerHTML = 'Select proper time'
        } else if (team === null || team === 'Select team') {
            const error = document.getElementById('error')
            error.innerHTML = ''
            const error2 = document.getElementById('error2')
            error2.innerHTML = 'Select your team first'
        } else if (payment === 'Select Payment Method') {
            const error2 = document.getElementById('error2')
            error2.innerHTML = ''
            const error = document.getElementById('error')
            error.innerHTML = ''
            const error3 = document.getElementById('error3')
            error3.innerHTML = 'Select a payment method'
        } else {
            if (payment === 'Wallet') {
                setWalletPayment(true)
                navigate(`/payment/${price}/${id}/${date}/${team}`)
            } else {
                const error2 = document.getElementById('error2')
                error2.innerHTML = ''
                const error = document.getElementById('error')
                error.innerHTML = ''
                const error3 = document.getElementById('error3')
                error3.innerHTML = ''
                navigate(`/checkout/${price}/${id}/${date}/${team}`)
            }
        }
    }

    const handleChat = async (receiverId) => {
        const chat = await dispatch(createChat(receiverId))
        const chatId = chat?.chatExist._id
        await localStorage.setItem('chatUser', JSON.stringify(chatId))
        navigate(`/chat`)
    }

    const filterPastTimes = (time) => {
        const now = new Date();
        if (date.getDate() === now.getDate() && time < now) {
            return false; // Disable past times if the date is today
        }
        return true; // Allow all other times
    };

    const turfId = singleTurf?.singleTurf?._id

    const startPayment = async (price, id, date, team) => {
        const result = await dispatch(bookTurfWallet(price, id, date, team))
        if (result) {
            toast.success('Payment successful', { duration: 2000 });
            setTimeout(() => {
                setWalletPayment(false)
            }, 2000);
        }
    }

    useEffect(() => {
        if (userInfo) {
            dispatch(isBooked(date, turfId))
            dispatch(getWalletAmount())
        }
    }, [dispatch, date, turfId, userInfo])

    return (
        <>
            {walletPayment ? (
                <section className='bg-emerald-500 flex items-center justify-center h-screen fixed inset-0 bg-opacity-25 '>
                    <Toaster />
                    <div className="flex justify-center mt-10">
                        <div className="w-full max-w-md border border-cyan-600 rounded-lg p-8 bg-white shadow-lg">
                            <p className="text-center text-indigo-600 text-xl font-semibold mb-6">Wallet Payment</p>
                            <hr />
                            <div className="my-8">
                                <div className="bg-white rounded-md p-4 shadow-md">
                                    <p className="text-center text-xl font-bold mb-4 text-emerald-600">
                                        Wallet Balance: ₹ <span className="text-orange-600/90">{userWalletAmount.walletAmount} /-</span>
                                    </p>
                                    <p className="text-center text-xl font-bold text-orange-600">
                                        Amount to be Paid: ₹ {singleTurf?.singleTurf?.price} /-
                                    </p>
                                </div>
                            </div>
                            <div className='flex justify-center space-x-4'>
                                <button onClick={() => startPayment(singleTurf?.singleTurf?.price, singleTurf?.singleTurf?._id, date, team)} className="w-1/2 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-white rounded-lg py-2">
                                    Pay
                                </button>
                                <button onClick={() => setWalletPayment(false)} className="w-1/2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white text-center rounded-lg py-2">Go Back</button>
                            </div>
                        </div>
                    </div>
                </section>
            ) : (
                <>
                    <Header />
                    <div className="bg-white">
                        <div className="pt-6">
                            <nav aria-label="Breadcrumb">
                                <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                                    <li className="text-sm">
                                        <h1 className='font-medium text-gray-500 hover:text-gray-600'>{singleTurf?.singleTurf?.name}</h1>
                                    </li>
                                </ol>
                            </nav>
                            {bookedError || error || walletAmountError ? (
                                <p style={{ color: "red" }} variant="body2" className='text-center mb-5'>
                                    {bookedError || error || walletAmountError}
                                </p>
                            ) : <br />}
                            {/* Image gallery */}
                            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
                                <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                                    <img
                                        src={singleTurf?.singleTurf?.image[0].url}
                                        alt={singleTurf?.singleTurf?.image[0].url}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                        <img
                                            src={singleTurf?.singleTurf?.image[1].url}
                                            alt={singleTurf?.singleTurf?.image[1].url}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                    <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                                        <img
                                            src={singleTurf?.singleTurf?.image[2].url}
                                            alt={singleTurf?.singleTurf?.image[2].url}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>
                                </div>
                                <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                                    <img
                                        src={singleTurf?.singleTurf?.image[3].url}
                                        alt={singleTurf?.singleTurf?.image[3].url}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                            </div>
                            {/* Product info */}
                            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                                <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{singleTurf?.singleTurf?.name}</h1>
                                </div>
                                {/* Options */}
                                <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                                    {/* Description and details */}
                                    <div>
                                        <h3 className="sr-only">Description</h3>
                                        <div className="space-y-6">
                                            <p className="text-base text-gray-900">{singleTurf?.singleTurf?.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <h3 className="text-sm font-medium text-gray-900">Location</h3>
                                        <div className="mt-4">
                                            <h1 className='text-sm text-gray-500'>{singleTurf?.singleTurf?.location}</h1>
                                            <h2>{singleTurf?.location}</h2>
                                        </div>
                                    </div>
                                    <div className='mt-3 rounded-full'>
                                        <Maps coords={singleTurf?.singleTurf?.coordinates} />
                                    </div>
                                </div>
                                <div className="mt-4 lg:row-span-3 lg:mt-0">
                                    <p className="text-3xl tracking-tight text-gray-900">₹{singleTurf?.singleTurf?.price} <span className='font-medium text-gray-500 '>Per hour</span></p>
                                    {/* Reviews */}
                                    <div className="mt-6">
                                        <h3 className="sr-only">Reviews</h3>
                                        <div className="flex items-center">
                                            <div className="flex items-center">
                                                {[0, 1, 2, 3, 4].map((rating) => (
                                                    <StarIcon
                                                        key={rating}
                                                        className={classNames(
                                                            reviews.average > rating ? 'text-gray-900' : 'text-gray-200',
                                                            'h-5 w-5 flex-shrink-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ))}
                                            </div>
                                            <p className="sr-only">{reviews.average} out of 5 stars</p>
                                            <a href={reviews.href} className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                                                {reviews.totalCount} reviews
                                            </a>
                                        </div>
                                    </div>
                                    <div className="mt-10">
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-900">Capacity</h3>
                                            <h1>{singleTurf?.singleTurf?.capacity} <span className='font-medium text-gray-500 '>member per team</span></h1>
                                        </div>
                                        <div className="mt-10">
                                            <span id='error' className='text-red-600'></span>
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-sm font-medium text-gray-900 m-3">Select date and time</h3>
                                            </div>
                                            <DatePicker selected={date} onChange={(e) => setDate(e)} showTimeSelect timeIntervals={60} minDate={new Date()} filterTime={filterPastTimes}
                                                dateFormat="d/M/y p" className={'border border-indigo-500 rounded text-lg'} />
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="relative left-44 -top-9 w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                            </svg>
                                            <span id='error2' className='text-red-600'></span>
                                            <select
                                                id="category"
                                                name="category"
                                                value={team ?? ''}
                                                onChange={(e) => setTeam(e.target.value)}
                                                autoComplete='off'
                                                className="block w-40 rounded-md my-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            >
                                                <option>Select team</option>
                                                <option>One Team</option>
                                                <option>Two Teams</option>
                                            </select>
                                        </div>
                                        {userInfo ? (
                                            bookedTurf.alreadyBooked?.userId === userInfo.Id ?
                                                <p className='text-orange-600'>You have already booked this turf at this time..!
                                                    <br />
                                                    <span className='text-emerald-600'> Please select another time..</span>
                                                </p>
                                                : bookedTurf?.alreadyBooked?.team === 'One Team' ? (
                                                    <>
                                                        <p className='text-orange-600'>At this date and time, the turf is booked by another user.!
                                                            <span className='text-emerald-600'> You can Invite him for a match</span>
                                                        </p>
                                                        <button onClick={() => handleChat(bookedTurf.alreadyBooked?.userId)}
                                                            className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                            Invite for a Match
                                                        </button>
                                                    </>
                                                ) : bookedTurf?.alreadyBooked?.team === 'Two Team' ? (
                                                    <p className='text-orange-600'>Another user have already booked this turf at this time.. With 2 teams..!!
                                                        <br />
                                                        <span className='text-emerald-600'> Please select another time..</span>
                                                    </p>
                                                ) : (
                                                    <div className='mt-5'>
                                                        <hr />
                                                        <h1 className="text-2xl text-indigo-600 font-semibold my-3">Payment</h1>
                                                        <span id='error3' className='text-red-600'></span>
                                                        <select name="payment"
                                                            id="payment"
                                                            onChange={(e) => setPayment(e.target.value)}
                                                            className='block w-56 rounded-md my-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'>
                                                            <option>Select Payment Method</option>
                                                            <option>Wallet</option>
                                                            <option>Card</option>
                                                        </select>
                                                        {payment === 'Wallet' && <div>
                                                            <h1 className='text-emerald-600'>Balance : ₹ <span className='text-orange-600'>{userWalletAmount?.walletAmount}</span> /-</h1>
                                                        </div>}
                                                        {payment === 'Wallet' && userWalletAmount.walletAmount < singleTurf?.singleTurf?.price ? (
                                                            <h1 className='text-orange-600 mt-2'>Insufficient balance in wallet..!! <span className='text-emerald-600'>Please select another payment method..</span></h1>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleBooking(singleTurf?.singleTurf?.price, singleTurf?.singleTurf?._id)}
                                                                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                                Book Turf
                                                            </button>
                                                        )}
                                                    </div>
                                                )
                                        ) : (
                                            <>
                                                <h1 className='text-red-600 text-lg my-3'>You Need to <Link to={'/login'}>
                                                    <span className='inline-flex text-2xl bg-indigo-600/90 rounded text-white px-2 hover:bg-indigo-600'>LOGIN</span>
                                                </Link> First For Booking Turf</h1>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </>
            )
            }
        </>
    )
}

export default Booking