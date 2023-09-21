import React, { useEffect } from 'react'
import ProviderHeader from './ProviderHeader'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../Loading/Loading'
import { providerTotalBooking, providerTotalRevenue, providerTurfCount } from '../../Actions/providerActions'
import { ClipboardDocumentListIcon, CurrencyRupeeIcon, UserGroupIcon, GlobeAsiaAustraliaIcon } from '@heroicons/react/24/outline'
import ProviderGraphChart from '../chartComponent/ProviderGraphChart'
import ProviderBarChart from '../chartComponent/ProviderBarChart'

const ProviderHome = () => {
    const dispatch = useDispatch()

    const loading = useSelector(state => state.loading)
    
    const providerLogin = useSelector((state) => state.providerLogin)
    const { providerInfo } = providerLogin

    const totalBookings = useSelector(state => state.providerBookings)
    const { totalBookingError, totalBooking } = totalBookings
    const userCount = [...new Set(totalBooking?.booking?.map(item => item.userId))];
    const cancelledBookings = totalBooking?.booking?.filter((item) => item.booking.startsWith('Cancelled'))
    const booked = totalBooking?.booking?.filter((item) => item.booking.startsWith('Booked'))
    const approvedBooking = totalBooking?.booking?.filter((item) => item.booking.startsWith('Approved'))

    const providerRevenue = useSelector(state => state.providerRevenue)
    const { totalRevenue, totalRevenueError } = providerRevenue

    const providerTurf = useSelector(state => state.providerTurfs)
    const { turfCount, turfCountError } = providerTurf
    const notApprovedTurf = turfCount?.turf?.filter((item) => item.isBlocked === true)

    useEffect(() => {
        if (providerInfo) {
            dispatch(providerTotalBooking())
            dispatch(providerTotalRevenue())
            dispatch(providerTurfCount())
        }
    }, [dispatch, providerInfo])

    return (
        <>
            {loading ? (
                <Loading />
            ) : (<>
                <ProviderHeader />
                <div className="p-4">
                    <div className="bg-white p-4">
                        {totalBookingError || totalRevenueError || turfCountError ? (
                            <p className='text-red-600'>{totalBookingError || totalRevenueError || turfCountError}</p>
                        ) : (<br />)
                        }
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-800 shadow-md mt-10 p-4 rounded">
                                    <h6 className="font-bold text-gray-700 mb-2">TOTAL BOOKING</h6>
                                    <p className="flex text-white">
                                        <ClipboardDocumentListIcon className="w-6 mr-2" />{totalBooking?.booking?.length}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4">
                                <div className="bg-gradient-to-r from-teal-500 to-teal-800 shadow-md mt-10 p-4 rounded">
                                    <h6 className="font-bold text-gray-700 mb-2">TOTAL REVENUE</h6>
                                    <p className="flex text-white">
                                        <CurrencyRupeeIcon className="w-6 mr-2" /> {totalRevenue?.wallet}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-green-500 to-green-800 shadow-md mt-10 p-4 rounded">
                                    <h6 className="font-bold text-gray-700 mb-2">TOTAL TURFS</h6>
                                    <p className="flex text-white">
                                        <GlobeAsiaAustraliaIcon className="w-6 mr-2" />{turfCount?.turf?.length}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-800 shadow-md mt-10 p-4 rounded">
                                    <h6 className="font-bold text-gray-700 mb-2">TOTAL USERS</h6>
                                    <p className="flex text-white">
                                        <UserGroupIcon className="w-6 mr-2" /> {userCount?.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Additional Grid */}
                        <div className="flex flex-col sm:flex-row sm:space-x-4">
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-800 shadow-md mt-10 p-4 rounded">
                                    <p className="font-bold text-gray-700 mb-2">APPROVED BOOKING:<span className='font-normal text-white'>{approvedBooking?.length}</span></p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-teal-500 to-teal-800 shadow-md mt-10 p-4 rounded">
                                    <p className="font-bold text-gray-700 mb-2">CANCELLED BOOKING: <span className='font-normal text-white'>{cancelledBookings?.length}</span></p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4 ">
                                <div className="bg-gradient-to-r from-green-500 to-green-800 shadow-md mt-10 p-4 rounded">
                                    <p className="font-bold text-gray-700 mb-2">NOT APPROVED BOOKING: <span className='font-normal text-white'>{booked?.length}</span></p>
                                </div>
                            </div>
                            <div className="w-full sm:w-1/4">
                                <div className="bg-gradient-to-r from-purple-500 to-purple-800 shadow-md mt-10 p-4 rounded">
                                    <p className="font-bold text-gray-700 mb-2">REQUESTED TURFS: <span className='font-normal text-white'>{notApprovedTurf?.length}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 md:flex-row">
                        <div className="md:w-1/2 ">
                            <div className="mx-auto mt-10 md:w-auto lg:w-full shadow-md">
                                <h2 className="mt-10 mb-10 flex justify-center items-center text-center text-gray-600 font-fantasy text-2xl">BOOKINGS</h2>
                                <ProviderGraphChart />
                            </div>
                        </div>
                        <div className="md:w-1/2 ">
                            <div className="mx-auto mt-10 md:w-auto lg:w-full shadow-md">
                                <h2 className="mt-10 mb-10 flex justify-center items-center text-center text-gray-600 font-fantasy text-2xl">TURF PRICE</h2>
                                <ProviderBarChart />
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
        </>
    )
}

export default ProviderHome