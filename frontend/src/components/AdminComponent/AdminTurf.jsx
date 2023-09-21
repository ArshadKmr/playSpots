import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { adminTurfList, handleTurf } from '../../Actions/adminActions'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const AdminTurf = () => {
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)

    const adminTurf = useSelector((state) => state.adminTurfList)
    const { turfList, turfError } = adminTurf

    const updateTurf = useSelector((state) => state.updateTurf)

    useEffect(() => {
        dispatch(adminTurfList())
    }, [dispatch, updateTurf])

    const recordsPerPage = 5
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    let numbers
    const records = turfList.turfList?.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(turfList.turfList?.length / recordsPerPage)
    if (nPage) {
        numbers = [...Array(nPage + 1).keys()].slice(1)
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

    const handleClick = (id, status) => {
        status === 1 ?
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to unblock this category?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-red-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-emerald-600/80 tex-gray-500 rounded w-28'
                                    onClick={() => {
                                        dispatch(handleTurf(id, status))
                                        onClose();
                                    }}>Yes, Unblock !
                                </button>
                            </div>
                        </div>
                    );
                }
            }) : confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to block this category?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-emerald-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-red-600/80 tex-gray-500 rounded w-20'
                                    onClick={() => {
                                        dispatch(handleTurf(id, status))
                                        onClose();
                                    }}>Yes, Block!
                                </button>
                            </div>
                        </div>
                    );
                }
            })
    }
    return (
        <>
            <AdminHeader />
            {turfError ? (<span className='text-red-600 flex justify-center m-5'>{turfError}</span>) : (null)}
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                {/* <ul className="divide-y divide-gray-100">
                    {records?.map((turf, index) => (
                        <li key={index} className="m-5 flex justify-between gap-x-6 py-5">
                            <div className="flex gap-x-4">
                                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={turf.image[0].url} alt="" />
                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{turf.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{turf.email}</p>
                                </div>
                            </div>
                            <div className="sm:flex sm:flex-col sm:items-end">
                                {turf.isBlocked ? (
                                    <>
                                        <button className='bg-emerald-600/80 tex-gray-500 rounded w-20 ' onClick={() => handleClick(turf._id, 1)}>
                                            Unblock
                                        </button>
                                        <div className="mt-1 flex items-center gap-x-1.5">
                                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">Blocked</p>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <button className='bg-red-600/80 tex-gray-500 rounded w-20' onClick={() => handleClick(turf._id, 0)}>
                                            Block
                                        </button>
                                        <div className="mt-1 flex items-center gap-x-1.5">
                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                            </div>
                                            <p className="text-xs leading-5 text-gray-500">Active</p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul> */}
                <ul className="divide-y divide-gray-100">
                    {records?.map((turf, index) => (
                        <li key={index} className="m-3 p-4 bg-white shadow-md rounded-md">
                            <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                <div className="flex items-center gap-x-4 mb-2 sm:mb-0">
                                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={turf.image[0].url} alt="" />
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">{turf.name}</p>
                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{turf.email}</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
                                    {turf.isBlocked ? (
                                        <>
                                            <button className='text-sm bg-emerald-600/80 text-gray-800 rounded w-20 mb-2 sm:mb-0' onClick={() => handleClick(turf._id, 1)}>
                                                Unblock
                                            </button>
                                            <div className="mt-1 ml-2 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Blocked</p>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <button className='text-sm bg-red-600/80 text-gray-800 rounded w-20 mb-2 sm:mb-0' onClick={() => handleClick(turf._id, 0)}>
                                                Block
                                            </button>
                                            <div className="mt-1 ml-2 flex items-center gap-x-1.5">
                                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                </div>
                                                <p className="text-xs leading-5 text-gray-500">Active</p>
                                            </div>
                                        </>
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
                                    Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{turfList.turfList?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                    <span className="font-medium">{turfList.turfList?.length}</span> results
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
        </>
    )
}

export default AdminTurf