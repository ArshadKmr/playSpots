import React, { useEffect } from 'react'
import AdminHeader from './AdminHeader'
import BarChart from '../chartComponent/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { adminProviderCount, adminRevenue, adminTotalBookings, adminTurfCount, adminUserCount } from '../../Actions/adminActions'
import { CurrencyRupeeIcon, UserCircleIcon, UserGroupIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline'
import GraphChart from '../chartComponent/GraphChart'

const AdminHome = () => {
    const dispatch = useDispatch()

    const adminLogin = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminLogin

    const adminWalletAmount = useSelector((state) => state.adminWalletAmount)
    const { revenue, revenueError } = adminWalletAmount

    const totalUserCount = useSelector((state) => state.adminUserCount)
    const { userCountError, userCount } = totalUserCount

    const totalProviderCount = useSelector((state) => state.adminProviderCount)
    const { providerCountError, providerCount } = totalProviderCount

    const totalBookings = useSelector((state) => state.adminBookings)
    const { adminBookings, adminBookingsError } = totalBookings

    const adminTurfs = useSelector((state) => state.adminTurfs)
    const { turfCount, turfCountError } = adminTurfs

    const approvedProvider = providerCount?.providerData?.filter((item) => item.isApproved === true)
    const requestedProvider = providerCount?.providerData?.filter((item) => item.isApproved === false)

    const cancelledBooking = adminBookings?.bookingData?.filter((item) => item.booking.startsWith('Cancelled'))
    const approvedBooking = adminBookings?.bookingData?.filter((item) => item.booking === 'Approved')

    useEffect(() => {
        if (adminInfo) {
            dispatch(adminRevenue())
            dispatch(adminUserCount())
            dispatch(adminProviderCount())
            dispatch(adminTotalBookings())
            dispatch(adminTurfCount())
        }
    }, [dispatch, adminInfo])

    return (
        <>
            <AdminHeader />
            <div className="p-4">
                <div className="bg-white p-4">
                    {revenueError || userCountError || providerCountError || adminBookingsError || turfCountError ? (
                        <p className='text-red-600'>{revenueError || userCountError || providerCountError || adminBookingsError || turfCountError}</p>
                    ) : (<br />)
                    }
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        <div className="w-full sm:w-1/4 ">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-800 shadow-md mt-10 p-4 rounded">
                                <h6 className="font-bold text-gray-700 mb-2">TOTAL BOOKING</h6>
                                <p className="flex text-white">
                                    <ClipboardDocumentListIcon className="w-6 mr-2" />{adminBookings?.bookingData?.length}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <div className="bg-gradient-to-r from-teal-500 to-teal-800 shadow-md mt-10 p-4 rounded">
                                <h6 className="font-bold text-gray-700 mb-2">TOTAL REVENUE</h6>
                                <p className="flex text-white">
                                    <CurrencyRupeeIcon className="w-6 mr-2" /> {revenue?.revenue}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4 ">
                            <div className="bg-gradient-to-r from-green-500 to-green-800 shadow-md mt-10 p-4 rounded">
                                <h6 className="font-bold text-gray-700 mb-2">TOTAL USERS</h6>
                                <p className="flex text-white">
                                    <UserGroupIcon className="w-6 mr-2" />{userCount?.userCount}
                                </p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4 ">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-800 shadow-md mt-10 p-4 rounded">
                                <h6 className="font-bold text-gray-700 mb-2">TOTAL PROVIDERS</h6>
                                <p className="flex text-white">
                                    <UserCircleIcon className="w-6 mr-2" /> {approvedProvider?.length}
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
                                <p className="font-bold text-gray-700 mb-2">CANCELLED BOOKING: <span className='font-normal text-white'>{cancelledBooking?.length}</span></p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4 ">
                            <div className="bg-gradient-to-r from-green-500 to-green-800 shadow-md mt-10 p-4 rounded">
                                <p className="font-bold text-gray-700 mb-2">TURF COUNT: <span className='font-normal text-white'>{turfCount?.turfData?.length}</span></p>
                            </div>
                        </div>
                        <div className="w-full sm:w-1/4">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-800 shadow-md mt-10 p-4 rounded">
                                <p className="font-bold text-gray-700 mb-2">PROVIDERS REQUESTS: <span className='font-normal text-white'>{requestedProvider?.length}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-5 md:flex-row">
                    <div className="md:w-1/2 ">
                        <div className=" mx-auto mt-10 md:w-auto lg:w-full shadow-md">
                            <h2 className="mt-10 mb-10 flex justify-center items-center text-center text-gray-600 font-fantasy text-2xl">BOOKINGS</h2>
                            <BarChart />
                        </div>
                    </div>
                    <div className="md:w-1/2 ">
                        <div className="mx-auto mt-10 md:w-auto lg:w-full shadow-md">
                            <h2 className="mt-10 mb-10 flex justify-center items-center text-center text-gray-600 font-fantasy text-2xl">TURFS</h2>
                            <GraphChart />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminHome