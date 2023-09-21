import React, { useEffect, useState } from 'react'
import ProviderHeader from './ProviderHeader'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { turfList, providerSingleTurf } from '../../Actions/providerActions'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const ProviderTurf = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentPage, setCurrentPage] = useState(1)

    const providerTurfList = useSelector((state) => state.providerTurfList)
    const { turf } = providerTurfList

    const recordsPerPage = 4
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    let numbers
    const records = turf.turfList?.slice(firstIndex, lastIndex)
    const nPage = Math.ceil(turf.turfList?.length / recordsPerPage)
    if (nPage) {
        numbers = [...Array(nPage + 1).keys()].slice(1)
    }

    const handleImageClick = (id) => {
        dispatch(providerSingleTurf(id))
        navigate('/provider/singleTurf')
    };

    useEffect(() => {
        dispatch(turfList())
    }, [dispatch])

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
            <ProviderHeader />
            <div>
                <div className='flex justify-evenly m-5'>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">Your Turfs</h2>
                    <Link to={'/provider/turf/addturf'} className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Turf</Link>
                </div>
                <div>
                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {records?.map((product, index) => (
                                    <div key={index} onClick={() => handleImageClick(product._id)} className="group relative">
                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                            <img
                                                src={product.image[0].url}
                                                alt={product.imageAlt}
                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                            />
                                        </div>
                                        <div className="mt-4 flex justify-between">
                                            <div>
                                                <h3 className="text-sm text-gray-700">
                                                    <a href={product.href}>
                                                        <span aria-hidden="true" className="absolute inset-0" />
                                                        {product.name}
                                                    </a>
                                                </h3>
                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                            </div>
                                            <p className="text-sm font-medium text-gray-900">{product.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <nav>
                                <div className="flex items-center justify-between border-t mt-10 border-gray-200 bg-white px-4 py-3 sm:px-6">
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
                                                Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{turf.turfList?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                                <span className="font-medium">{turf.turfList?.length}</span> results
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProviderTurf