import React, { useState } from 'react'
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs'
import OtpInput from 'otp-input-react'
import { CgSpinner } from 'react-icons/cg'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { auth } from '../../util/firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import toast, { Toaster } from 'react-hot-toast';

const Otp = ({isVisible,onClose,onRegister}) => {
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)
    const [ph, setPh] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const [user, setUser] = useState(null)

    if(!isVisible) return null
    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignup()
                },
                'expired-callback': () => { }
            });
        }
    }

    function onSignup() {
        setLoading(true)
        onCaptchVerify()
        const appVerifier = window.recaptchaVerifier

        const formatPh ='+' + ph
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
        window.confirmationResult.confirm(otp).then(async(res)=>{
            console.log("res : ",res);
            setUser(res.user)
            onRegister()
            setLoading(false)
        }).catch(error=>{
            console.log(error)
            toast.error('Invalid OTP')
            setLoading(false)
        })
    }


    return (
        <section className='bg-emerald-500 flex items-center justify-center h-screen fixed inset-0 bg-opacity-25 backdrop-blur-sm'>
            <div className='flex flex-col'>
                <Toaster toastOptions={{duration:4000}}/>
                <button className='text-xl place-self-end text-white' onClick={()=>onClose()}>x</button>
                <div id='recaptcha-container'></div>
                {user ? (<h2 className='text-center  text-white font-medium text-3xl mb-6'>
                    Login Success
                </h2>) : (<div className='w-80 flex flex-col gap-4 rounded-lg p-4'>
                    
                    {showOTP ? (
                        <>
                            <div className='bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full'>
                                <BsFillShieldLockFill size={30} />
                            </div>
                            <label htmlFor="otp" className='font-bold text-2xl text-white text-center'>
                                Enter your OTP
                            </label>
                            <OtpInput value={otp} onChange={setOtp} OTPLength={6} otpType='number' disabled={false} autoFocus className='flex justify-between gap-2'></OtpInput>
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
                            <label htmlFor="ph" className='font-bold text-xl text-white text-center'>
                                Verify Your Phone number
                            </label>
                            <PhoneInput country={'in'} value={ph} onChange={setPh} />
                            <button onClick={onSignup} className='bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
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
    )
}

export default Otp