import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getWallet, getWalletAmount } from '../../Actions/userActions'
import Header from './Header'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import Icon from '../../assets/Images/fully-booked-green-imprint-isolated-white-background-174701613.png'
import Icon2 from '../../assets/Images/cancell.jpg'

const Wallet = () => {
    const dispatch = useDispatch()
    const [option, setOption] = useState('All')
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        dispatch(getWallet())
        dispatch(getWalletAmount())
    }, [dispatch])

    const wallet = useSelector((state) => state.userWallet)
    const { userWallet, walletError } = wallet

    const walletAmount = useSelector((state) => state.userWalletAmount)
    const { userWalletAmount, walletAmountError } = walletAmount

    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    let numbers
    let records
    let bookedList
    if (option === 'All') {
        records = userWallet?.wallet?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(userWallet?.wallet?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    } else if (option === 'Booked') {
        bookedList = userWallet?.wallet.filter(item => item?.transaction.startsWith('Booked'))
        records = bookedList?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(bookedList?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    } else {
        bookedList = userWallet?.wallet.filter(item => item?.transaction.startsWith('Cancelled'))
        records = bookedList?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(bookedList?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    }

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

    return (
        <>
            <Header />
            <div>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <div className='flex flex-col sm:flex-row items-center justify-between mb-3'>
                        <h1 className='text-gray-600 '>Available Balance ₹ <span className='text-black'>{userWalletAmount.walletAmount} </span>/-</h1>
                        <select
                            id="category"
                            name="category"
                            value={option ?? ''}
                            onChange={(e) => setOption(e.target.value)}
                            autoComplete="country-name"
                            className="block w-40 sm:w-72 mt-2 sm:mt-0 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        >
                            <option>All</option>
                            <option>Booked</option>
                            <option>Cancelled</option>
                        </select>
                    </div>
                    <hr />
                    <p id='error' className='text-red-600 text-center my-4'></p>
                    {walletError || walletAmountError ? (
                        <p style={{ color: "red" }} variant="body2" className='text-center mb-5'>
                            {walletError || walletAmountError}
                        </p>
                    ) : <br />}
                    <div className="m-3 overflow-x-auto">
                        <ul className="divide-y divide-gray-100">
                            {records?.map((item, index) => (
                                <li key={index} className="flex flex-col py-3 sm:flex-row sm:items-center justify-between w-full">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        {item.transaction.startsWith('Booked') ? (
                                            <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={Icon} alt="" />
                                        ) : (
                                            <img className="h-12 w-12 flex-none rounded bg-gray-50" src={Icon2} alt="" />
                                        )}
                                        <div className="ml-4">
                                            <p className="text-xs leading-5 text-gray-500">{item?.transaction}</p>
                                            {item.transaction.startsWith('Booked') ? (
                                                <p className="text-xs leading-5 text-red-500">Debited Amount: ₹{item.amount}/-</p>
                                            ) : (
                                                <p className="text-xs leading-5 text-emerald-500">Credited Amount: ₹{item.amount}/-</p>
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
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{userWallet?.wallet?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                            <span className="font-medium">{userWallet?.wallet?.length}</span> results
                                        </p>
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
                    </div >
                </div >
            </div>
        </>
    )
}

export default Wallet