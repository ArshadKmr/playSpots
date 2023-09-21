import React, { useState } from 'react'
import Header from './Header'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { bookTurf, turfBooking } from '../../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { price, id, date, team } = useParams()

    const [openPayment, setOpenPayment] = useState(false)
    const [paymentDetails, setPaymentDetails] = useState('')

    const stripe = useStripe()
    const elements = useElements()

    const userBooking = useSelector((state) => state.userTurfBooking)
    const { bookingError } = userBooking

    const startPayment = async () => {
        const fetchClientSecret = async () => {
            const data = await dispatch(bookTurf(price))
            setPaymentDetails(data.data)
        }
        fetchClientSecret()
        setOpenPayment(true)
    }

    const confirmPayment = async (e) => {
        e.preventDefault()
        try {
            const result = await stripe.confirmCardPayment(paymentDetails.clientSecret.client_secret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            if (result.paymentIntent) {
                toast.success('Payment successful', { duration: 2000 });
                setTimeout(async () => {
                    await dispatch(turfBooking(price, id, date, paymentDetails.clientSecret.id,team));
                    navigate('/booking');
                }, 2000);
            } else {
                toast.error(result.error.message);
            }
        } catch (err) {
            console.warn(err);
        }
    }

    return (
        <>
            <Header />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <Toaster />
                {bookingError ? (
                    <p style={{ color: "red" }} variant="body2" className='text-center mb-5'>
                        {bookingError}
                    </p>
                ) : <br />}
                {openPayment ? (
                    <>
                        <div className="flex justify-center mt-10">
                            <div className="w-full max-w-sm border border-cyan-600 rounded-lg p-6">
                                <p className="text-center text-indigo-600 text-lg mb-6">Enter Card Details</p>
                                <div className="mb-6">
                                    <CardElement className="border p-3 rounded-md w-full" />
                                </div>
                                <div className="flex justify-center space-x-4">
                                    <button onClick={confirmPayment} className="w-1/2 py-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300">
                                        Pay
                                    </button>
                                    <button onClick={() => setOpenPayment(false)} className="w-1/2 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center mt-10">
                            <div className="w-full max-w-md border border-cyan-600 rounded-lg p-8 bg-white shadow-lg">
                                <p className="text-center text-indigo-600 text-xl font-semibold mb-6">Secure Payment</p>
                                <div className="mb-8">
                                    <div className="border rounded-md p-3">
                                        <p className="text-center text-2xl font-bold mb-3">Total Amount: ₹{price}/-</p>
                                    </div>
                                </div>
                                <div className='flex justify-center space-x-4'>
                                    <button onClick={startPayment} className="w-1/2 bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring focus:ring-emerald-300 text-white rounded-lg py-2">
                                        Proceed to Payment
                                    </button>
                                    <Link to={'/booking'} className="w-1/2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-300 text-white text-center rounded-lg py-2">Go Back</Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Checkout