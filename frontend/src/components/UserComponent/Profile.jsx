import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { userBookedTurfs, cancelBookingAction } from '../../Actions/userActions'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Profile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)
    const [option, setOption] = useState('All')
    const [date, setDate] = useState(null)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const usersTurfs = useSelector(state => state.userBookedTurf)
    const { userBookedTurf } = usersTurfs

    const cancelBookingStore = useSelector(state => state.cancelBooking)
    const { cancelBooking } = cancelBookingStore

    function formatTurfDate(dateString) {
        const cleanedDateString = dateString?.replace(/\s*GMT[+-]\d{4}.*$/, '');
        const date = new Date(cleanedDateString);
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'short' });
        const month = date.toLocaleString('en-US', { month: 'short' });
        const day = date.getDate();
        const year = date.getFullYear();
        const hours = date.getHours() % 12 || 12;
        const minutes = date.getMinutes();
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';

        return `${dayOfWeek} ${month} ${day}, ${year} ${hours}:${minutes.toLocaleString('en-US', { minimumIntegerDigits: 2 })} ${ampm}`;
    }
    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    let numbers
    let records
    let bookedList
    let allBooking
    if (date) {
        const dateObject = new Date(date);
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options).replace(/,/g, '').replace(/\b(\d)\b/g, '0$1');
        allBooking = userBookedTurf?.bookedTurf?.filter(item => item?.bookedInfo?.date.startsWith(formattedDate))
        if (allBooking?.length === 0) {
            const error = document.getElementById('error');
            error.innerHTML = 'No bookings available at this date..!!'
        } else {
            const error = document.getElementById('error');
            error.innerHTML = ''
            if (option === 'All') {
                records = allBooking?.slice(firstIndex, lastIndex)
                const nPage = Math.ceil(allBooking?.length / recordsPerPage)
                if (nPage) {
                    numbers = [...Array(nPage + 1).keys()].slice(1)
                }
            } else if (option === 'Booked') {
                bookedList = allBooking?.filter(item => item?.bookedInfo?.booking === 'Booked')
                if (bookedList.length === 0) {
                    const error = document.getElementById('error');
                    error.innerHTML = 'No Booked turfs at this date..!!'
                }
                records = bookedList?.slice(firstIndex, lastIndex)
                const nPage = Math.ceil(bookedList?.length / recordsPerPage)
                if (nPage) {
                    numbers = [...Array(nPage + 1).keys()].slice(1)
                }
            } else if (option === 'Approved') {
                bookedList = allBooking?.filter(item => item?.bookedInfo?.booking === 'Approved')
                if (bookedList.length === 0) {
                    const error = document.getElementById('error');
                    error.innerHTML = 'No Approved turfs at this date..!!'
                }
                records = bookedList?.slice(firstIndex, lastIndex)
                const nPage = Math.ceil(bookedList?.length / recordsPerPage)
                if (nPage) {
                    numbers = [...Array(nPage + 1).keys()].slice(1)
                }
            } else {
                bookedList = allBooking?.filter(item => item?.bookedInfo?.booking.startsWith('Cancelled'))
                if (bookedList.length === 0) {
                    const error = document.getElementById('error');
                    error.innerHTML = 'No Cancelled turfs at this date..!!'
                }
                records = bookedList?.slice(firstIndex, lastIndex)
                const nPage = Math.ceil(bookedList?.length / recordsPerPage)
                if (nPage) {
                    numbers = [...Array(nPage + 1).keys()].slice(1)
                }
            }
        }
    } else {
        if (option === 'All') {
            records = userBookedTurf?.bookedTurf?.slice(firstIndex, lastIndex)
            const nPage = Math.ceil(userBookedTurf?.bookedTurf?.length / recordsPerPage)
            if (nPage) {
                numbers = [...Array(nPage + 1).keys()].slice(1)
            }
        } else if (option === 'Booked') {
            bookedList = userBookedTurf?.bookedTurf.filter(item => item?.bookedInfo?.booking === 'Booked')
            records = bookedList?.slice(firstIndex, lastIndex)
            const nPage = Math.ceil(bookedList?.length / recordsPerPage)
            if (nPage) {
                numbers = [...Array(nPage + 1).keys()].slice(1)
            }
        } else if (option === 'Approved') {
            bookedList = userBookedTurf?.bookedTurf.filter(item => item?.bookedInfo?.booking === 'Approved')
            records = bookedList?.slice(firstIndex, lastIndex)
            const nPage = Math.ceil(bookedList?.length / recordsPerPage)
            if (nPage) {
                numbers = [...Array(nPage + 1).keys()].slice(1)
            }
        } else {
            bookedList = userBookedTurf?.bookedTurf.filter(item => item?.bookedInfo?.booking.startsWith('Cancelled'))
            records = bookedList?.slice(firstIndex, lastIndex)
            const nPage = Math.ceil(bookedList?.length / recordsPerPage)
            if (nPage) {
                numbers = [...Array(nPage + 1).keys()].slice(1)
            }
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate('/home')
        } else {
            dispatch(userBookedTurfs())
        }
    }, [dispatch, navigate, userInfo, cancelBooking])

    const prePage = () => {
        if (currentPage !== firstIndex) {
            setCurrentPage(currentPage - 1)
        }
    }
    const changeCPage = (id) => {
        setCurrentPage(id)
    }
    const nextPage = () => {
        if (currentPage !== lastIndex) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handleCancel = (id) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='custom-ui '>
                        <h1 className='text-center'>Are you sure?</h1>
                        <p className='text-center mb-5'>You want to cancel this booking?
                            <br />
                            <span className='text-orange-600'>It will take 5-7 days for refunding the money</span>
                        </p>
                        <div className='flex justify-between'>
                            <button onClick={onClose} className='bg-red-600/80 tex-gray-500 rounded w-20'>No</button>
                            <button className='bg-emerald-600/80 tex-gray-500 rounded w-28'
                                onClick={() => {
                                    dispatch(cancelBookingAction(id))
                                    onClose();
                                }}>Yes, cancel !
                            </button>
                        </div>
                    </div>
                );
            }
        })
    }
    return (
        <>
            <Header />
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8 mb-5">
                <div className='flex flex-col sm:flex-row items-center sm:justify-end mb-3'>
                    <DatePicker selected={date} onChange={(e) => setDate(e)}
                        placeholderText='Select a date'
                        dateFormat="d/M/y" className={'w-64 border border-indigo-500 rounded text-lg m-2'} />
                    <select
                        id="category"
                        name="category"
                        value={option ?? ''}
                        onChange={(e) => setOption(e.target.value)}
                        autoComplete="country-name"
                        className="block m-2 w-64 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option>All</option>
                        <option>Booked</option>
                        <option>Approved</option>
                        <option>Cancelled</option>
                    </select>
                </div>
                <hr />
                <p id='error' className='text-red-600 text-center my-4'></p>
                {userBookedTurf?.bookedTurf?.length > 0 ?
                    <>
                        <ul className="divide-y divide-gray-100">
                            {records?.map((turf, index) => (
                                <li key={index} className="m-3 p-4 bg-white shadow-md rounded-md">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                        <div className="flex items-center gap-x-4 mb-2 sm:mb-0">
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={turf?.turfInfo.image[0].url} alt="" />
                                            <div className="min-w-0 flex-auto">
                                                <p className="text-sm font-semibold leading-6 text-gray-900">{turf?.turfInfo.name}</p>
                                                <p className="text-sm font-semibold leading-6 text-gray-900">Price: ₹{turf?.bookedInfo?.price}/-</p>
                                                <p className="text-sm font-semibold leading-6 text-gray-900">Booked for: {turf?.bookedInfo?.team}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
                                            <p className="mt-2 text-xs leading-5 text-gray-500"><span className='text-gray-800'>Booking Time:</span> {turf?.bookedInfo?.turfId === turf.turfInfo._id ? formatTurfDate(turf?.bookedInfo?.date) : ''}</p>
                                            {turf?.bookedInfo?.booking === 'Booked' ? (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <button className='text-sm bg-red-600/80 rounded w-28 h-6' onClick={() => handleCancel(turf?.bookedInfo._id)}>Cancel Booking</button>
                                                    <div className="flex-none rounded-full bg-indigo-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">{turf?.bookedInfo.booking}</p>
                                                </div>
                                            ) : turf?.bookedInfo?.booking === 'Approved' ? (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">{turf?.bookedInfo.booking}</p>
                                                </div>
                                            ) : (
                                                <div className="mt-1 flex items-center gap-x-1.5">
                                                    <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                    </div>
                                                    <p className="text-xs leading-5 text-gray-500">{turf?.bookedInfo.booking}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <nav>
                            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-evenly sm:hidden">
                                    {currentPage === firstIndex + 1 ? (
                                        ''
                                    ) : (
                                        <Link
                                            onClick={prePage}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {numbers ? currentPage === numbers[numbers.length - 1] ? '' : (
                                        <Link onClick={nextPage}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    ) : ''}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        {option === 'All' ? (
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{userBookedTurf?.bookedTurf?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                                <span className="font-medium">{userBookedTurf?.bookedTurf?.length}</span> results
                                            </p>
                                        ) : option === 'Booked' ? (
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{bookedList?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                                <span className="font-medium">{bookedList?.length}</span> results
                                            </p>
                                        ) : option === 'Approved' ? (
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{bookedList?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                                <span className="font-medium">{bookedList?.length}</span> results
                                            </p>
                                        ) : (
                                            <p className="text-sm text-gray-700">
                                                Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{bookedList?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                                <span className="font-medium">{bookedList?.length}</span> results
                                            </p>
                                        )
                                        }
                                    </div>
                                    <div>
                                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            {currentPage === firstIndex + 1 ? (
                                                ''
                                            ) : (
                                                <Link onClick={prePage}
                                                    className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                >
                                                    <span className="sr-only">Previous</span>
                                                    <ChevronLeftIcon className="h-5 w-5 fill-indigo-600" aria-hidden="true" />
                                                </Link>
                                            )}
                                            {numbers?.map((item, index) =>
                                                <li className='p-3 list-none ' key={index}>
                                                    <Link onClick={() => changeCPage(item)} className={item === currentPage ? 'relative z-10 inline-flex items-center rounded-full bg-indigo-600 px-3 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600' : 'text-indigo-600'}>{item}</Link>
                                                </li>
                                            )}
                                            {numbers ?
                                                currentPage === numbers[numbers.length - 1] ? (
                                                    ''
                                                ) : (
                                                    <Link onClick={nextPage}
                                                        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                                                    >
                                                        <span className="sr-only">Next</span>
                                                        <ChevronRightIcon className="h-5 w-5 fill-indigo-600" aria-hidden="true" />
                                                    </Link>
                                                )
                                                : ''}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </nav>
                    </>
                    : <>
                        <h1 className='text-center text-4xl'>NO BOOKINGS FOUND..!!</h1></>}
            </div>
        </>
    )
}

export default Profile