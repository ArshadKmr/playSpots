import React, { useEffect } from 'react'
import turf from '../../assets/Login/turf4.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../Actions/userActions'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);
    const initialValues = {
        email: "",
        password: ""
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid Email Address').required('Email is Required'),
        password: Yup.string().min(5).max(15).required('Password is Required')
    })
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values) => {
                dispatch(login(values.email, values.password))
                if(!Error){
                    navigate('/')
                }
            }
        })
    return (
        <>
            <Header />
            <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                <div className='hidden sm:block'>
                    <img className='w-full h-full object-cover' src={turf} alt="" />
                </div>
                <div className='bg-gray-800 flex flex-col justify-center'>
                    <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-900 px-8 rounded-lg'>
                        <h2 className='text-4xl text-indigo-600 font-bold text-center pt-3'>SIGN IN</h2>
                        { Error ? (
                            <p style={{ color: "red" }} className='text-center m-5' variant="body2">
                                {error}
                            </p>
                        ) : null}
                        <div className='flex flex-col text-gray-400 py-2'>
                            {/* <label>Username</label> */}
                            {errors.email && touched.email ? (
                                <p style={{ color: "red" }} variant="body2">
                                    {errors.email}
                                </p>
                            ) : <br/>}
                            
                            <input placeholder='Email' value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ' id='email' name='email' type="email" />
                        </div>
                        <div className='flex flex-col text-gray-400 py-2'>
                            {/* <label>Password</label> */}
                            {errors.password && touched.password ? (
                                <p style={{ color: "red" }} variant="body2">
                                    {errors.password}
                                </p>
                            ) : <br/>}
                            <input placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' id='password' name='password' type="password" />
                        </div>
                        <div className='flex justify-between text-indigo-600 py-2 my-3'>
                            <Link>Forgot Password?</Link>
                            <Link to={'/register'}>Not Registered Yet!?</Link>
                        </div>
                        <button type="submit" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg'>Sign In</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
