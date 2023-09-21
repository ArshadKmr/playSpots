import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Header from '../UserComponent/Header'
import partnerImg from '../../assets/Images/partner-with-us-cover.png'
import users from '../../assets/Images/users.png'
import venue from '../../assets/Images/stadium-icon.png'
import cities from '../../assets/Images/city.png'
import sports from '../../assets/Images/balls-sports.png'
import play from '../../assets/Images/play.png'
import banner from '../../assets/Images/sub-banner.png'

const ProviderWelcome = () => {
    const navigate = useNavigate()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const providerLogin = useSelector((state) => state.providerLogin)
    const { providerInfo } = providerLogin
    useEffect(() => {
        if (!providerInfo) {
            navigate('/provider/welcome')
        }
    }, [navigate, providerInfo])
    return (
        <>
            <Header />
            <div className="relative h-[50vh] w-full flex items-center justify-center">
                <img src={partnerImg} alt="" className="absolute inset-0 w-full h-full object-cover object-center" />
                <h1 className="text-white text-2xl sm:text-4xl md:text-6xl font-bold absolute z-10">PARTNER WITH US</h1>
            </div>
            <div className='-mt-14 sm:-mt-20 md:-mt-28 lg:-mt-36 relative z-50 p-5 md:p-10'>
                <div className='flex flex-col md:flex-row justify-center text-center px-10 md:px-20 md:py-12 md:gap-6 w-full'>
                    <div className='bg-green-100 p-5 xl:p-16 lg:p-12 md:p-8 rounded-2xl text-center mb-5 md:mb-0 md:w-1/5'>
                        <img className='w-12 m-auto' src={users} alt="" />
                        <h1 className='text-lg md:text-3xl text-center mt-2 md:mt-3'>100+</h1>
                        <p className='text-lg md:text-xl lg:text-2xl text-green-700 text-center mt-2 md:mt-3'>USERS</p>
                    </div>
                    <div className='bg-green-100 p-5 xl:p-16 lg:p-12 md:p-8 rounded-2xl text-center mb-5 md:mb-0 md:w-1/5'>
                        <img className='w-12 m-auto' src={venue} alt="" />
                        <h1 className='text-lg md:text-3xl text-center mt-2 md:mt-3'>20+</h1>
                        <p className='text-lg md:text-xl lg:text-2xl text-green-700 text-center mt-2 md:mt-3'>VENUES</p>
                    </div>
                    <div className='bg-green-100 p-5 xl:p-16 lg:p-12 md:p-8 rounded-2xl text-center mb-5 md:mb-0 md:w-1/5'>
                        <img className='w-12 m-auto' src={cities} alt="" />
                        <h1 className='text-lg md:text-3xl text-center mt-2 md:mt-3'>10+</h1>
                        <p className='text-lg md:text-xl lg:text-2xl text-green-700 text-center mt-2 md:mt-3'>CITIES</p>
                    </div>
                    <div className='bg-green-100 p-5 xl:p-16 lg:p-12 md:p-8 rounded-2xl text-center mb-5 md:mb-0 md:w-1/5'>
                        <img className='w-12 m-auto' src={sports} alt="" />
                        <h1 className='text-lg md:text-3xl text-center mt-2 md:mt-3'>5+</h1>
                        <p className='text-lg md:text-xl lg:text-2xl text-green-700 text-center mt-2 md:mt-3'>GAMES</p>
                    </div>
                    <div className='bg-green-100 p-5 xl:p-16 lg:p-12 md:p-8 rounded-2xl mb-5 md:mb-0 md:w-1/5'>
                        <img className='w-12 m-auto' src={play} alt="" />
                        <h1 className='text-lg md:text-3xl text-center mt-2 md:mt-3'>2+</h1>
                        <p className='text-lg md:text-xl lg:text-2xl mx-auto text-green-700 mt-2 md:mt-3'>STATES</p>
                    </div>
                </div>
                    {!userInfo && <h1 className='text-red-600 text-center'>You Have to Login as User First For Register..!!!</h1>}
                <div className='flex flex-col sm:flex-row justify-evenly text-xl mx-4 sm:mx-20 p-5 gap-5 sm:p-10'>
                    <div className='flex justify-center mb-4 sm:mb-0'>
                        <Link to={'/provider'} className='p-3 sm:p-5 bg-green-500 text-white rounded w-auto'>Login as Provider</Link>
                    </div>
                    {userInfo ? (
                        <>
                            <div className='flex justify-center mb-4 sm:mb-0'>
                                <Link to={'/provider/register'} className='p-3 sm:p-5 bg-indigo-600/80 text-white rounded w-auto'>Register as Partner</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='flex justify-center'>
                                <Link to={'/login'} className='p-3 sm:p-5 bg-indigo-600/80 text-white rounded w-auto'><span>Login as User</span></Link>
                            </div>
                        </>
                    )}
                </div>
                <div className='flex flex-col md:flex-row justify-start m-12'>
                    <div className='w-full md:w-1/2 flex justify-center'>
                        <div className='my-auto text-center md:text-left'>
                            <p className='text-3xl md:text-5xl font-light'>Grow Your Business With</p>
                            <h1 className='mt-2 md:mt-5 text-4xl md:text-6xl font-semibold'>PLAYSPOTS</h1>
                        </div>
                    </div>
                    <div className='w-full md:w-1/2 p-5 md:p-10'>
                        <img src={banner} alt="" className="max-w-full h-auto" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProviderWelcome