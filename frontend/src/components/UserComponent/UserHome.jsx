import React from 'react'
import Header from './Header'
import video from '../../assets/video/beach-soccer.mp4'
import imageRight from '../../assets/Images/hero-phone-right.png'
import imageLeft from '../../assets/Images/hero-phone-left.png'
import { useNavigate } from 'react-router-dom'
import india from '../../assets/Images/india-map.png'
import search from '../../assets/Images/search.png'
import book from '../../assets/Images/book.png'
import play from '../../assets/Images/play.png'
import meetPal from '../../assets/Images/meet-pals.png'
import { useSelector } from 'react-redux'

const UserHome = () => {
    const providerLogin = useSelector((state) => state.providerLogin)
    const { providerInfo } = providerLogin

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const navigate = useNavigate()
    return (
        <>
            {/* <div className="fixed top-0 left-0 w-full z-50">
            </div> */}
            <Header />
            <div className="h-screen relative">
                <video
                    src={video}
                    loop
                    autoPlay
                    muted
                    className="w-full h-screen object-cover absolute inset-0 z-[-1]"
                />
                <div className="z-[1] ">
                    <div className='p-10 '>
                        <div className='p-10 flex flex-col items-center sm:flex-row justify-center sm:justify-around'>
                            <div className='text-center sm:text-left'>
                                <h1 className="text-gray-100 text-5xl sm:text-7xl font-semibold">
                                    PLAY LIKE A PRO
                                </h1>
                                <h2 className='mt-2 sm:my-5 text-green-600 text-3xl sm:text-4xl font-medium'>
                                    BOOK YOUR TURF
                                </h2>
                                <div className=' flex flex-col sm:flex-row text-white'>
                                    {userInfo ? (
                                        <button onClick={() => navigate('/turfs')} className='bg-green-600 text-white py-2 px-4 rounded-full mb-2 sm:mb-0 sm:mr-2'>
                                            To Book Venue
                                        </button>
                                    ) : (
                                        <button onClick={() => navigate('/login')} className='bg-green-600 text-white py-2 px-4 rounded-full mb-2 sm:mb-0 sm:mr-2'>
                                            To Book Venue
                                        </button>
                                    )}
                                    {providerInfo ? (
                                        <button onClick={() => navigate('/provider/turf')} className='bg-blue-600 text-white py-2 px-4 rounded-full'>
                                            To List Venue
                                        </button>
                                    ) : (
                                        <button onClick={() => navigate('/provider/welcome')} className='bg-blue-600 text-white py-2 px-4 rounded-full'>
                                            To List Venue
                                        </button>
                                    )}
                                </div>
                            </div>
                            <div className='hidden md:flex '>
                                <img className='w-28 lg:w-48' src={imageLeft} alt="" />
                                <img className='w-28 lg:w-48 -ml-10' src={imageRight} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div className='flex flex-col md:flex-row border-t-2 border-green-600 bg-slate-900 '>
                <div className='w-full md:w-1/2'>
                    <img src={india} className='w-full md:h-full object-cover' alt="" />
                </div>
                <div className='bg-gradient-to-r from-green-400 to-yellow-300 p-4 md:w-1/2'>
                    <h3 className='text-2xl md:text-5xl font-medium mt-4 md:mt-10'>
                        PLAYSPOT HAS
                    </h3>
                    <h1 className='text-3xl md:text-7xl lg:text-8xl font-bold text-white mt-2 md:mt-5'>
                        PRESENCE IN ALL CITIES ACROSS INDIA
                    </h1>
                    <h6 className='text-sm md:text-xl font-normal mt-2 md:mt-5'>
                        JOIN WITH THE LARGEST SPORTS GROUND MANAGEMENT SOLUTION
                    </h6>
                </div>
            </div>
            <div className='flex flex-col md:flex-row gap-2 justify-around p-10'>
                <div className='text-center md:w-1/3 mt-10 md:px-10'>
                    <img className='w-14 mx-auto' src={search} alt="" />
                    <h1 className='mt-2 text-2xl'>Search</h1>
                    <p className='mt-2 text-sm font-light md:text-base'>Are you looking to play after work, organize your Sunday Five's football match? Explore the largest network of sports facilities all over India</p>
                </div>
                <div className='text-center md:w-1/3 mt-10 md:px-10'>
                    <img className='w-14 mx-auto' src={book} alt="" />
                    <h1 className='mt-2 text-2xl'>Book</h1>
                    <p className='mt-2 text-sm font-light md:text-base'>Once you’ve found the perfect ground, court, or gym, connect with the venue through the "Book Now" button to make an online booking and secure easier payment.</p>
                </div>
                <div className='text-center md:w-1/3 mt-10 md:px-10'>
                    <img className='w-14 mx-auto' src={play} alt="" />
                    <h1 className='mt-2 text-2xl'>Play</h1>
                    <p className='mt-2 text-sm font-light md:text-base'>You’re the hero. You’ve found a stunning turf or court, booked with ease, and now it's time to play. The scene is set for your epic match.</p>
                </div>
            </div>
            <div className='flex flex-col md:flex-row bg-gray-900 py-5'>
                <div className='md:hidden p-10 text-center'>
                    <img src={meetPal} className='w-80 object-cover mx-auto px-10' alt="" />
                </div>
                <div className='text-center md:w-1/2 md:p-10 md:mt-5'>
                    <h1 className='text-green-600 text-3xl md:text-4xl'>MEET YOUR PALS OVER GAME</h1>
                    <p className='text-white px-16 mt-5 font-light md:text-lg'>Want to play games ?
                        <br />
                        But don't get an opponent team?
                        <br />
                        You can Invite a team or Join a pre scheduled match Through Playspots
                    </p>
                </div>
                <div className='hidden md:flex md:w-1/2'>
                    <img src={meetPal} className='w-96 object-cover px-10 mx-auto' alt="" />
                </div>
            </div>
        </>
    )
}

export default UserHome