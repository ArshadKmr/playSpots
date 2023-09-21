import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { listTurf, turfDetail, searchTurf, filterTurf } from '../../Actions/userActions'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { categoryList } from '../../Actions/providerActions'


const Turfs = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [search, setSearch] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [option, setOption] = useState(null)

    const userTurf = useSelector((state) => state.userTurfList)
    const { turf, error } = userTurf

    const userSearchTurf = useSelector((state) => state.userSearchTurf)
    const { searchError, searchedTurf } = userSearchTurf

    const providerCategory = useSelector((state) => state.providerCategoryList)
    const { category } = providerCategory

    const userFilterTurf = useSelector((state) => state.userFilterTurf)
    const { filteredTurf } = userFilterTurf


    const recordsPerPage = 4
    const lastIndex = currentPage * recordsPerPage
    const firstIndex = lastIndex - recordsPerPage
    let numbers
    let records
    if (search?.length > 0) {
        records = searchedTurf.searchedTurf?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(searchedTurf.searchedTurf?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    }
    else if (filteredTurf.filteredTurf?.length > 0) {
        records = filteredTurf.filteredTurf?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(filteredTurf.filteredTurf?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    } else {
        records = turf.turfData?.slice(firstIndex, lastIndex)
        const nPage = Math.ceil(turf.turfData?.length / recordsPerPage)
        if (nPage) {
            numbers = [...Array(nPage + 1).keys()].slice(1)
        }
    }

    useEffect(() => {
        dispatch(listTurf())
        dispatch(categoryList())
        if (search?.length > 0) {
            dispatch(searchTurf(search))
        }
        if (option !== null || option !== 'All Categories') {
            dispatch(filterTurf(option))
            setCurrentPage(1)
        }
    }, [dispatch, search, option])

    const handleClick = (id) => {
        dispatch(turfDetail(id))
        navigate('/booking')
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
            <section>
                <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                    <div
                        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#1100ff] to-[#1100ff] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                            }}
                        />
                    </div>
                    <div
                        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#1100ff] to-[#1100ff] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                            }}
                        />
                    </div>
                    <div className='flex flex-col justify-between sm:flex-row'>
                        <div className="flex relative ">
                            <div className="absolute right-1 bottom-2 pointer-events-auto">
                                <svg className=" text-slate-400 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" name='search' autoComplete='off' onChange={(e) => setSearch(e.target.value)} placeholder="Search Location" className="focus:ring-indigo-500 inline-block rounded w-full md:w-96" />
                        </div>
                        <div className="flex flex-1 justify-end mt-2 sm:ml-2 sm:mt-0">
                            <select
                                id="category"
                                name="category"
                                value={option ?? ''}
                                onChange={(e) => setOption(e.target.value)}
                                autoComplete="country-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option>All Categories</option>
                                {category.category?.map((item, index) => (
                                    <option key={index} value={item._id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>
            {search?.length > 0 ? (<section>
                <div className="bg-slate-300">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-5">List Of Turfs </h2>
                        {searchError ? (<span className='text-red-600 flex justify-center m-5'>{searchError}</span>) : (null)}
                        {searchedTurf.searchedTurf?.length > 0 ? (<div>
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {records?.map((product, index) => (
                                    <div key={index} onClick={() => handleClick(product._id)} className="group relative cursor-pointer">
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
                        </div>) : (
                            <h1 className='text-center text-2xl text-red-600'>NO TURF FOUND</h1>
                        )}
                    </div>
                </div>
            </section>) : filteredTurf.filteredTurf?.length > 0 ? (<section>
                <div className="bg-slate-300">
                    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-5">List Of Turfs </h2 >
                        {error ? (<span className='text-red-600 flex justify-center m-5' > {error}</span>) : (null)
                        }
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                            {records?.map((product, index) => (
                                <div key={index} onClick={() => handleClick(product._id)} className="group relative cursor-pointer">
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
                    </div >
                </div >
            </section >) : (
                <section>
                    <div className="bg-slate-300">
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-900 text-center mb-5">List Of Turfs </h2 >
                            {error ? (<span className='text-red-600 flex justify-center m-5' > {error}</span>) : (null)
                            }
                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                {records?.map((product, index) => (
                                    <div key={index} onClick={() => handleClick(product._id)} className="group relative cursor-pointer">
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
                        </div >
                    </div >
                </section >
            )}
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
                        {search?.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{searchedTurf.searchedTurf?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                    <span className="font-medium">{searchedTurf.searchedTurf?.length}</span> results
                                </p>
                            </div>
                        ) : filteredTurf.filteredTurf?.length > 0 ? (
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{filteredTurf.filteredTurf?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                    <span className="font-medium">{filteredTurf.filteredTurf?.length}</span> results
                                </p>
                            </div>
                        ) : (
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing <span className="font-medium">{firstIndex + 1}</span> <span className="font-medium">{turf.turfData?.length === firstIndex + 1 ? '' : ' to ' + lastIndex}</span> of {' '}
                                    <span className="font-medium">{turf.turfData?.length}</span> results
                                </p>
                            </div>
                        )}
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
    )
}

export default Turfs