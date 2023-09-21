import React,{useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch,useSelector } from 'react-redux'
import { login } from '../../Actions/adminActions'
import icon from '../../assets/Images/WHITE.png'

const AdminLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const adminLogin = useSelector((state) => state.adminLogin);
    const { error, adminInfo } = adminLogin;
    useEffect(() => {
        if (adminInfo) {
            navigate("/admin/home");
        }
    }, [adminInfo, navigate]);
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
                dispatch(login(values.email,values.password))
            }
        })
    return (
        <div style={{ backgroundColor: 'rgb(17 24 39)' }}>
            <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8" >
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src={icon}
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl text-indigo-600 font-bold leading-9 tracking-tight" >
                        <span className='mr-3' style={{color:'white'}}>WELCOME  </span> ADMIN!
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {Error ? (
                            <p style={{ color: "red" }} className='text-center' variant="body2">
                                {error}
                            </p>
                        ) : null}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                                Email address
                            </label>
                            {errors.email && touched.email ? (
                                <p style={{ color: "red" }} variant="body2">
                                    {errors.email}
                                </p>
                            ) : null}
                            <div className="mt-2">
                                <input
                                    value={values.email} autoComplete='off' onChange={handleChange} onBlur={handleBlur}
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset bg-gray-800 ring-gray-700 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:bg-gray-800 focus:outline-none"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                                Password
                            </label>
                            {errors.password && touched.password ? (
                                <p style={{ color: "red" }} variant="body2">
                                    {errors.password}
                                </p>
                            ) : null}
                            <div className="mt-2">
                                <input
                                    value={values.password} onChange={handleChange} onBlur={handleBlur}
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="block w-full rounded-md border-0 p-2 text-white shadow-sm ring-1 ring-inset bg-gray-800 ring-gray-700 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 focus:bg-gray-800 focus:outline-none" />
                            </div>
                            <div className="text-sm m-3">
                                <Link className="font-semibold text-indigo-600 hover:text-indigo-500">
                                    Forgot password?
                                </Link>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminLogin