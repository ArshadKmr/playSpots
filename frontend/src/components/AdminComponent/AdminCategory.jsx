import React, { useEffect, useState } from 'react'
import AdminHeader from './AdminHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory, handleCategory, categoryList } from '../../Actions/adminActions'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { useNavigate } from 'react-router-dom'

const AdminCategory = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)

    const createCategory = useSelector((state) => state.createCategory)
    const { error } = createCategory

    const adminLogin = useSelector((state) => state.adminLogin)
    const { adminInfo } = adminLogin

    const adminCategoryList = useSelector((state) => state.categoryList)
    const { category } = adminCategoryList

    const updateCategoryList = useSelector((state) => state.updateCategory)
    const { updatedCategory } = updateCategoryList

    useEffect(() => {
        if (!adminInfo) {
            navigate('/admin')
        }
    })

    useEffect(() => {
        dispatch(categoryList())
    }, [dispatch, updatedCategory, category])

    const handleVisible = () => {
        setVisible(true)
    }

    const initialValues = {
        name: ''
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required').min(5, 'Must be at least 5 characters')
    })

    const handleClick = (id, status) => {
        status === 1 ?
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to unblock this category?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-red-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-emerald-600/80 tex-gray-500 rounded w-28'
                                    onClick={() => {
                                        dispatch(handleCategory(id, status))
                                        onClose();
                                    }}>Yes, Unblock !
                                </button>
                            </div>
                        </div>
                    );
                }
            }) : confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to block this category?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-emerald-600/80 rounded w-20'>No</button>
                                <button className='bg-red-600/80 rounded w-20'
                                    onClick={() => {
                                        dispatch(handleCategory(id, status))
                                        onClose();
                                    }}>Yes, Block!
                                </button>
                            </div>
                        </div>
                    );
                }
            })
    }

    const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
        useFormik({
            initialValues,
            validationSchema: validationSchema,
            onSubmit: async (values, action) => {
                dispatch(addCategory(values.name))
                setVisible(false)
                action.resetForm()
            }
        })

    return (
        <>
            {!visible ? (
                <>
                    <AdminHeader />
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        <div className='mx-auto max-w-2xl'>
                            <div className='flex justify-center mb-16'>
                                <button onClick={handleVisible}
                                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ">
                                    Add Category
                                </button>
                            </div>
                            {error ? (
                                <p style={{ color: "red" }} variant="body2" className='text-center mb-5'>
                                    {error}
                                </p>
                            ) : <br />}
                            <ul className="divide-y divide-gray-100">
                                {category.category?.map((item, index) => (
                                    <li key={index} className="p-4 bg-white shadow-md rounded-md mb-2">
                                        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                            <div className="flex items-center gap-x-4 mb-2 sm:mb-0">
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
                                                {item.isAvailable ? (
                                                    <>
                                                        <div>
                                                            <button className='text-sm bg-red-600/80 text-white rounded w-20 h-6 mb-2 sm:mb-0' onClick={() => handleClick(item._id, 0)}>
                                                                Block
                                                            </button>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-x-1.5">
                                                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-500">Active</p>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <div>
                                                            <button className='text-sm bg-emerald-600/80 text-white rounded w-20 h-6 mb-2 sm:mb-0' onClick={() => handleClick(item._id, 1)}>
                                                                Unblock
                                                            </button>
                                                        </div>
                                                        <div className="mt-1 flex items-center gap-x-1.5">
                                                            <div className="flex-none rounded-full bg-red-500/20 p-1">
                                                                <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                                                            </div>
                                                            <p className="text-xs leading-5 text-gray-500">Blocked</p>
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                <section className='flex items-center justify-center h-screen fixed inset-0 bg-opacity-25  '>
                    <div className='mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'>
                        <div className='mx-auto max-w-2xl'>
                            <form onSubmit={handleSubmit}>
                                <div className="space-y-12">
                                    <div className="border-b border-gray-900/10 pb-12">
                                        <h2 className="text-2xl text-center font-semibold leading-7 text-emerald-600">ADD CATEGORY</h2>
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div className="sm:col-span-6">
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
                                                            className="block flex-1 border-0 bg-transparent w-72 text-gray-900 placeholder:text-gray-800 focus:ring-0 sm:text-sm sm:leading-6"
                                                            placeholder="Category Name"
                                                        />
                                                    </div>
                                                </div>
                                                <div className='flex justify-between mt-5 '>
                                                    <button type='submit' className="rounded-full w-16 bg-green-500 ">
                                                        Add
                                                    </button>
                                                    <button onClick={() => setVisible(false)} className="rounded-full w-16 bg-red-500">
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

export default AdminCategory