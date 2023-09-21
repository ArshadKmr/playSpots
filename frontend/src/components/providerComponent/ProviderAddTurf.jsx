import React, { useEffect, useState } from 'react'
import ProviderHeader from './ProviderHeader'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { categoryList, locationList } from '../../Actions/providerActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { addTurf } from '../../Actions/providerActions'
import axios from 'axios'

const ProviderAddTurf = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState(null)
    const [place, setPlace] = useState([])
    const [street, setStreet] = useState('')
    const [isFetching, setIsFetching] = useState(false);

    const providerLogin = useSelector((state) => state.providerLogin)
    const { providerInfo } = providerLogin

    const [file, setFile] = useState([])
    const handleFile = (e) => {
        const files = e.target.files;
        if (files.length > 4) {
            const error = document.getElementById('error')
            error.innerHTML = 'You can upload a maximum of 4 files.'
            return;
        }

        for (let i = 0; i < Math.min(files.length, 4); i++) {
            const file = files[i];
            setFileToBase(file);
        }
    };

    const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setFile(prev => [...prev, reader.result])
        };
    };
    const initialValues = {
        name: "",
        description: "",
        category: "",
        city: "",
        price: "",
        capacity: ""
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(5, 'Must be at least 5 characters long').required('Name is Required'),
        description: Yup.string().min(7, 'Must be at least 7 characters long').required('Description is Required'),
        category: Yup.string().required('Category is Required'),
        city: Yup.string().required('City is Required'),
        price: Yup.string().required('Price is required').matches(/^[0-9]+$/, "Price Must be only digits"),
        capacity: Yup.string().required('Capacity is required').matches(/^[0-9]+$/, "Capacity Must be only digits")
    })
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {
                if (file.length === 0) {
                    const errorFile = document.getElementById('error')
                    errorFile.innerHTML = 'Image file not found'
                } else if (street.length === 0 || street === 'Select a Street') {
                    const streetError = document.getElementById('streetError')
                    streetError.innerHTML = 'please select a street'
                } else {
                    const errorFile = document.getElementById('error')
                    errorFile.innerHTML = ''
                    const streetError = document.getElementById('streetError')
                    streetError.innerHTML = ''
                    dispatch(addTurf(
                        values.name,
                        values.description,
                        values.category,
                        values.city,
                        street,
                        values.price,
                        values.capacity,
                        file
                    ))
                    if (!error) {
                        navigate('/provider/turf')
                    }
                }
            }
        })

    const providerCategory = useSelector((state) => state.providerCategoryList)
    const { category } = providerCategory

    const providerLocation = useSelector((state) => state.providerLocationList)
    const { location } = providerLocation

    const providerTurf = useSelector((state) => state.providerAddTurf)
    const { error } = providerTurf

    const dispatch = useDispatch()
    useEffect(() => {
        if (!providerInfo) {
            navigate('/provider')
        } else {
            dispatch(locationList())
            dispatch(categoryList())
        }
    }, [dispatch, providerInfo, navigate])


    const fetchPlaceData = () => {
        if (search && !isFetching) {
            setIsFetching(true);
            axios
                .get(`https://api.locationiq.com/v1/autocomplete?key=pk.89101b912b08d7d8b2e6dbfe2ce2ded2&q=${search}`)
                .then((result) => {
                    setPlace(result.data);
                    setIsFetching(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsFetching(false);
                });
        }
    };
    
    useEffect(() => {
        const delay = 500; // Set your desired delay (in milliseconds)
        const timer = setTimeout(() => {
            fetchPlaceData();
        }, delay);
        return () => clearTimeout(timer);
    }, [search]); // Safe to omit from dependency array because it doesn't change

    const handleSelect = (e) => {
        setStreet(e.target.value)
        const streetError = document.getElementById('streetError')
        streetError.innerHTML = ''
    }

    return (
        <>
            <ProviderHeader />
            <h1 className='text-center text-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-gray-800'> Fill the form to Add new turf for users</h1>
            <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
                <div className='mx-auto max-w-2xl'>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Turf Details</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                                {Error ? (<span className='text-red-600'>{error}</span>) : (null)}
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        <div className="mt-2">
                                            {errors.name && touched.name ? (
                                                <p style={{ color: "red" }} variant="body2">
                                                    {errors.name}
                                                </p>
                                            ) : <br />}
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    autoComplete="off"
                                                    value={values.name}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    className="block flex-1 border-0 bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Name of Turf"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <div className="mt-2">
                                            {errors.description && touched.description ? (
                                                <p style={{ color: "red" }} variant="body2">
                                                    {errors.description}
                                                </p>
                                            ) : <br />}
                                            <textarea
                                                id="description"
                                                name="description"
                                                rows={3}
                                                value={values.description}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder='Discribe your Turf'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        {errors.category && touched.category ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.category}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                                            Category
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="category"
                                                name="category"
                                                value={values.category}
                                                onChange={handleChange} onBlur={handleBlur}
                                                autoComplete="country-name"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>Select an Option</option>
                                                {category.category?.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors.city && touched.city ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.city}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <select
                                                id="city"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange} onBlur={handleBlur}
                                                autoComplete="off"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                            >
                                                <option>Select an Option</option>
                                                {location.location?.map((item, index) => (
                                                    <option key={index} value={item._id}>{item.location}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <span id='streetError' className='text-red-600 '></span>
                                            <input
                                                type="text"
                                                name="street"
                                                id="street"
                                                autoComplete="off"
                                                placeholder='Search street'
                                                // value={sele}
                                                onChange={(e) => setSearch(e.target.value)}
                                                className="block w-full rounded-md mt-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                            <select className='rounded mt-2 w-full'
                                                value={street}
                                                onChange={(e) => handleSelect(e)}>
                                                <option>Select a Street</option>
                                                {place?.length > 0 ?
                                                    place?.map((item, index) =>
                                                        <option key={index} value={[item.lat, item.lon, item.display_name]}>{item.display_name}</option>
                                                    )
                                                    : ''}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors.price && touched.price ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.price}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                            Price Per Hour
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="price"
                                                id="price"
                                                autoComplete="off"
                                                value={values.price}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-3">
                                        {errors.capacity && touched.capacity ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.capacity}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="capacity" className="block text-sm font-medium leading-6 text-gray-900">
                                            Maximum Team Size
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="capacity"
                                                id="capacity"
                                                autoComplete="off"
                                                value={values.capacity}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                        Cover photos of Turf
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                            <span id='error' className='text-red-500'></span>
                                            <div className="mt-4 flex justify-center text-sm leading-6 text-gray-600">
                                                <label
                                                    htmlFor="file"
                                                    className=" cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload Images</span>
                                                    <input onChange={handleFile} id="file" name="file" accept='.png,.jpg,.avif,.jpeg' type="file" className="sr-only" multiple />
                                                </label>
                                            </div>
                                            <p className="ml-5 text-xs leading-5 text-gray-600">PNG, JPG up to 4 Files Only</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link to={'/provider/turf'}>Cancel</Link>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default ProviderAddTurf