import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { bookTurfWallet, getWalletAmount } from '../../Actions/userActions'

const WalletPayment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { price, id, date, team } = useParams()

    const walletAmount = useSelector((state) => state.userWalletAmount)
    const { userWalletAmount } = walletAmount

    const bookTurf = useSelector((state) => state.bookTurfWallet)
    const { walletBookError } = bookTurf

    const startPayment = async (price, id, date, team) => {
        const result = await dispatch(bookTurfWallet(price, id, date, team))
        if (result) {
            toast.success('Payment successful', { duration: 2000 });
            setTimeout(() => {
                navigate('/booking');
            }, 2000)
        } else {
            toast.error('Already Booked');
        }
    }
    useEffect(() => {
        dispatch(getWalletAmount())
    }, [dispatch])

    return (
        <>
            <section className=' flex items-center justify-center h-screen fixed inset-0 bg-opacity-25 '>
                <Toaster />
                <div className="flex justify-center mt-10">
                    {walletBookError && <p className='text-red-600'>{walletBookError}</p>}
                    <div className="w-full max-w-md border border-cyan-600 rounded-lg p-8 bg-white shadow-lg">
                        <p className="text-center text-indigo-600 text-xl font-semibold mb-6">Wallet Payment</p>
                        <hr />
                        <div className="my-8">
                            <div className="bg-white rounded-md p-4 shadow-md">
                                <p className="text-center text-xl font-bold mb-4 text-emerald-600">
                                    Wallet Balance: ₹ <span className="text-indigo-600/90">{userWalletAmount.walletAmount} /-</span>
                                </p>
                                <p className="text-center text-xl font-bold text-indigo-600">
                                    Amount to be Paid: ₹ <span className='text-emerald-600'>{price}</span> /-
                                </p>
                            </div>
                        </div>
                        <div className='flex justify-center space-x-4'>
                            <button onClick={() => startPayment(price, id, date, team)} className="w-1/2 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-white rounded-lg py-2">
                                Pay
                            </button>
                            <Link to={'/booking'} className="w-1/2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white text-center rounded-lg py-2">Go Back</Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WalletPayment