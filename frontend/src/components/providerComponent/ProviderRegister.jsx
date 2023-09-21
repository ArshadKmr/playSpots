import React, { useEffect, useState } from 'react'
import { PhotoIcon } from '@heroicons/react/24/solid'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../UserComponent/Header'
import { providerReq } from '../../Actions/providerActions'
import toast, { Toaster } from 'react-hot-toast';


const ProviderRegister = () => {

    const [file, setFile] = useState([])

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const providerRegister = useSelector((state) => state.providerRegister)
    const { error } = providerRegister

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if (!userInfo) {
            navigate('/provider/welcome')
        }
    }, [userInfo, navigate])

    const handleImage = (e) => {
        const data = e.target.files[0];
        setFileToBase(data);
    };

    const setFileToBase = (data) => {
        const reader = new FileReader();
        reader.readAsDataURL(data);
        reader.onloadend = () => {
            setFile(reader.result)
        };
    };

    const initialValues = {
        password: '',
        confirmPassword: '',
        country: '',
        street: '',
        city: '',
        state: '',
        pin: ''
    }

    const validationSchema = Yup.object().shape({
        password: Yup.string().required('Password is required').min(5, 'Must be at least 5 characters long').max(15, 'Must be upto 15 characters long'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required'),
        country: Yup.string().required('Country is required').min(4, 'Country must be at least 4 characters'),
        street: Yup.string().required('Street is required').min(5, 'Street must be more than 5 characters').max(20, 'Street must be less than 20 characters'),
        city: Yup.string().required('City is required').min(6, 'City must be more than 6 characters').max(20, 'City must be less than 20 characters'),
        state: Yup.string().required('State is required').min(3, 'State must be more than 3 characters').max(20, 'State must be less than 20 characters'),
        pin: Yup.string().matches(/^[0-9]+$/, "Postal Must be only digits").min(6, 'Must be exactly 6 digits').max(6, 'Must be exactly 6 digits').required('Postal is required')
    })
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values, action) => {
                if (!file) {
                    const errorFile = document.getElementById('error')
                    errorFile.innerHTML = 'Image file not found'
                } else {
                    const errorFile = document.getElementById('error')
                    errorFile.innerHTML = ''
                    dispatch(providerReq(
                        values.password,
                        values.city,
                        values.state,
                        values.pin,
                        values.country,
                        values.street,
                        file))
                    if (!error) {
                        toast.success('Registration successful..You can login once Admin Approved Your Request', { duration: 2000 });
                        setTimeout( () => {
                            navigate('/provider');
                        }, 2000);
                    } else {
                        action.resetForm()
                        toast.error(error.message);
                    }
                }
            }
        })
    return (
        <>
            <Header />
            <div className='mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8'>
                <Toaster />
                <div className='mx-auto max-w-2xl'>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900 text-center mb-5">REGISTER AS PROVIDER</h2>
                                <p className="mt-1 text-sm leading-6 text-gray-600 m-5 text-center">
                                    This information will be displayed publicly so be careful what you share.
                                </p>
                                <p className='text-purple-600 mb-5'><span className='text-red-700'>NOTICE: </span>DEFAULT EMAIL WILL BE WHICH YOU REGISTERED AS USER!!</p>
                                {error ? (<span className='text-red-600 mt-5'>{error}</span>) : (null)}
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-4">
                                        {errors.password && touched.password ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.password}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                            Password
                                        </label>
                                        <div className="mt-2">
                                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                                <input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    autoComplete="off"
                                                    value={values.password}
                                                    onChange={handleChange} onBlur={handleBlur}
                                                    className="block flex-1 border-0 bg-transparent py-1.5  text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                                    placeholder="Enter password"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <div className="mt-2">
                                            {errors.confirmPassword && touched.confirmPassword ? (
                                                <p style={{ color: "red" }} variant="body2">
                                                    {errors.confirmPassword}
                                                </p>
                                            ) : <br />}
                                            <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                                                Confirm Password
                                            </label>
                                            <input
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                type='password'
                                                value={values.confirmPassword}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder='Re-enter password'
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            Aadhaar Image
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <span id='error' className='text-red-500'></span>
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                    >
                                                        <span>Upload a file</span>
                                                        <input id="file-upload" onChange={handleImage} name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="border-b border-gray-900/10 pb-12">
                                <h2 className="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div className="sm:col-span-3">
                                        {errors.country && touched.country ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.country}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                            Country
                                        </label>
                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md mt-2">
                                            <input
                                                id="country"
                                                name="country"
                                                type="text"
                                                autoComplete="off"
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                value={values.country}
                                                onChange={handleChange} onBlur={handleBlur}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        {errors.street && touched.street ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.street}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="street" className="block text-sm font-medium leading-6 text-gray-900">
                                            Street address
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="street"
                                                id="street"
                                                autoComplete="off"
                                                value={values.street}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2 sm:col-start-1">
                                        {errors.city && touched.city ? (
                                            <p style={{ color: "red" }} variant="body2">
                                                {errors.city}
                                            </p>
                                        ) : <br />}
                                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                            City
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                type="text"
                                                name="city"
                                                id="city"
                                                autoComplete="off"
                                                value={values.city}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="mt-2">
                                            {errors.state && touched.state ? (
                                                <p style={{ color: "red" }} variant="body2">
                                                    {errors.state}
                                                </p>
                                            ) : <br />}
                                            <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                name="state"
                                                id="state"
                                                autoComplete="off"
                                                value={values.state}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <div className="mt-2">
                                            {errors.pin && touched.pin ? (
                                                <p style={{ color: "red" }} variant="body2">
                                                    {errors.pin}
                                                </p>
                                            ) : <br />}
                                            <label htmlFor="pin" className="block text-sm font-medium leading-6 text-gray-900">
                                                Pin code
                                            </label>
                                            <input
                                                type="text"
                                                name="pin"
                                                id="pin"
                                                autoComplete="off"
                                                value={values.pin}
                                                onChange={handleChange} onBlur={handleBlur}
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <Link to={'/home'} type='button' className="text-sm font-semibold leading-6 text-gray-900">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default ProviderRegister