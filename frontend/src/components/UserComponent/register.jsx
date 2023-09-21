import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import turf from '../../assets/Login/turf3.jpg'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../Actions/userActions'
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {auth} from '../../config/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [ph, setPh] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [user, setUser] = useState(null)

    const userLogin = useSelector((state) => state.userLogin);
    const { error, userInfo } = userLogin;
    useEffect(() => {
        if (userInfo) {
            navigate("/");
        }
    }, [userInfo, navigate]);

    const initialValues = {
        name: "",
        email: "",
        password: "",
        passwordConfirmation: '',
        mobile: "",
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().min(5).max(15).required('Username is Required'),
        email: Yup.string().email('Invalid Email Address').required('Email is Required'),
        mobile: Yup.string().matches(/^\+91[6789]\d{9}$/, 'Not valid Number (Include +91 without Space)').max(13, "Invalid Size").required('Phone number is required'),
        password: Yup.string().min(5).max(15).required('Password is Required'),
        passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is Required')
    })
    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async () => {
                setPh(values.mobile)
                setVisible(true)
            }
        })
    function registerUser() {
        dispatch(register(values.name, values.email, values.mobile, values.password))
        if (!Error) {
            navigate('/')
        }
    }
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignUp()
                },
                'expired-callback': () => { }
            });
        }
    }

    function onSignUp() {
        setLoading(true)
        onCaptchVerify()
        const appVerifier = window.recaptchaVerifier

        const formatPh = '+' + ph
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                setLoading(false)
                setShowOTP(true)
                toast.success('OTP sended successfully!')
            }).catch((error) => {
                console.log(error);
                setLoading(false)
            });
    }

    function onOTPVerify() {
        setLoading(true)
        window.confirmationResult.confirm(otp).then(async (res) => {
            setUser(res.user)
            registerUser()
            setLoading(false)
        }).catch(error => {
            console.log(error)
            toast.error('Invalid OTP')
            setLoading(false)
        })
    }

    return (
        <>
            {!visible ? (
                <div>
                    <Header />
                    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
                        <div className='hidden sm:block'>
                            <img className='w-full h-full object-cover' src={turf} alt="" />
                        </div>
                        <div className='bg-gray-800 flex flex-col justify-center'>
                            {/* <Toaster toastOptions={{ duration: 4000 }} /> */}
                            <form onSubmit={handleSubmit} className='max-w-[400px] w-full mx-auto bg-gray-900 px-8 rounded-lg'>
                                <h2 className='text-4xl text-indigo-600 font-bold text-center pt-3'>SIGN UP</h2>
                                {Error ? (
                                    <p style={{ color: "red" }} variant="body2">
                                        {error}
                                    </p>
                                ) : <br />}
                                <div className='flex flex-col text-gray-400 py-2'>
                                    {errors.name && touched.name ? (
                                        <p style={{ color: "red" }} variant="body2">
                                            {errors.name}
                                        </p>
                                    ) : <br />}
                                    <input placeholder='Full Name' value={values.name} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ' id='name' name='name' type="text" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    {errors.email && touched.email ? (
                                        <p style={{ color: "red" }} variant="body2">
                                            {errors.email}
                                        </p>
                                    ) : <br />}
                                    <input placeholder='Email' value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none ' id='email' name='email' type="email" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2 '>
                                    {errors.mobile && touched.mobile ? (
                                        <p style={{ color: "red" }} variant="body2">
                                            {errors.mobile}
                                        </p>
                                    ) : <br />}
                                    <input placeholder='Mobile' value={values.mobile} onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' id='mobile' name='mobile' type="text" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    {errors.password && touched.password ? (
                                        <p style={{ color: "red" }} variant="body2">
                                            {errors.password}
                                        </p>
                                    ) : <br />}
                                    <input placeholder='Password' value={values.password} onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' id='password' name='password' type="password" />
                                </div>
                                <div className='flex flex-col text-gray-400 py-2'>
                                    {errors.passwordConfirmation && touched.passwordConfirmation ? (
                                        <p style={{ color: "red" }} variant="body2">
                                            {errors.passwordConfirmation}
                                        </p>
                                    ) : <br />}
                                    <input placeholder='Re-enter Password' value={values.passwordConfirmation} onChange={handleChange} onBlur={handleBlur} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' id='passwordConfirmation' name='passwordConfirmation' type="password" />
                                </div>
                                <div className='flex justify-between text-indigo-600 py-2 mt-3'>
                                    <Link to={'/login'}>Already have an account?</Link>
                                </div>
                                <button type="submit" className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/30 text-white font-semibold rounded-lg'>Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (
                <section className='bg-emerald-500 flex items-center justify-center h-screen fixed inset-0 bg-opacity-25 '>
                    <div className='flex flex-col'>
                        <Toaster toastOptions={{ duration: 4000 }} />
                        <button className='text-xl place-self-end text-white' onClick={() => setVisible(false)}>x</button>
                        <div id='recaptcha-container'></div>
                        {user ? (<h2 className='text-center  text-white font-medium text-3xl mb-6'>
                            Your Number has been successfully verified
                        </h2>) : (<div className='w-80 flex flex-col gap-4 rounded-lg p-4'>

                            {showOTP ? (
                                <>
                                    <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsFillShieldLockFill size={30} />
                                    </div>
                                    <label htmlFor="otp" className='font-bold text-2xl text-emerald-600 text-center'>
                                        Enter your OTP
                                    </label>
                                    <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className='opt-container' style={{}}></OtpInput>
                                    <button onClick={onOTPVerify} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                                        {loading &&
                                            <CgSpinner size={20} className='mt-1 animate-spin' />
                                        }
                                        <span>Verify OTP</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                                        <BsTelephoneFill size={30} />
                                    </div>
                                    <label htmlFor="ph" className='font-bold text-xl text-emerald-600 text-center'>
                                        Verify Your Phone number
                                    </label>
                                    <PhoneInput country={'in'} value={ph} onChange={setPh} disabled className='react-tel-input' />
                                    <button onClick={onSignUp} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                                        {loading &&
                                            <CgSpinner size={20} className='mt-1 animate-spin' />
                                        }
                                        <span>Send code via SMS</span>
                                    </button>
                                </>
                            )}
                        </div>)}
                    </div>
                </section>
            )}
        </>
    )
}

export default Register