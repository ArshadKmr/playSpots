import React, { useEffect } from 'react'
import AdminHeader from './AdminHeader'
import { listProviders } from '../../Actions/adminActions'
import { useDispatch, useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { providerAcceptRejectAction } from '../../Actions/adminActions';

const AdminProviders = () => {
    const dispatch = useDispatch()
    const providersList = useSelector((state) => state.adminProvidersList)
    const { providers } = providersList

    const providerAcceptReject1 = useSelector((state) => state.providerAcceptReject);
    const { success } = providerAcceptReject1;


    useEffect(() => {
        dispatch(listProviders())
    }, [dispatch, success])

    const handleApprove = (id, status) => {
        status === 1 ?
            confirmAlert({
                customUI: ({ onClose }) => {
                    return (
                        <div className='custom-ui '>
                            <h1 className='text-center'>Are you sure?</h1>
                            <p className='text-center mb-5'>You want to approve this provider?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-red-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-emerald-600/80 tex-gray-500 rounded w-20'
                                    onClick={() => {
                                        dispatch(providerAcceptRejectAction(id, status))
                                        onClose();
                                    }}>Yes, Approve !
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
                            <p className='text-center mb-5'>You want to block this provider?</p>
                            <div className='flex justify-between'>
                                <button onClick={onClose} className='bg-emerald-600/80 tex-gray-500 rounded w-20'>No</button>
                                <button className='bg-red-600/80 tex-gray-500 rounded w-20'
                                    onClick={() => {
                                        dispatch(providerAcceptRejectAction(id, status))
                                        onClose();
                                    }}>Yes, Block!
                                </button>
                            </div>
                        </div>
                    );
                }
            })
    }
    return (
        <>
            <AdminHeader />
            <div >
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <ul className="divide-y divide-gray-100">
                        {providers.providers?.map((person) => (
                            <li key={person.email} className="p-4 bg-white shadow-md rounded-md mb-2">
                                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                    <div className="flex items-center gap-x-4 mb-2 sm:mb-0">
                                        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                                        <div className="min-w-0 flex-auto">
                                            {providers.user?.map((user, index) => (
                                                person.email === user.email ? (
                                                    <p key={index} className="text-sm font-semibold leading-6 text-gray-900">{user.name}</p>
                                                ) : null
                                            ))}
                                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-center sm:items-end mt-2 sm:mt-0">
                                        {person.isApproved ? (
                                            <>
                                                <div>
                                                    <button className='text-sm bg-red-600/80 text-white rounded w-20 h-6 mb-2 sm:mb-0' onClick={() => handleApprove(person._id, 0)}>
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
                                                    <button className='text-sm bg-emerald-600/80 text-white rounded w-20 h-6 mb-2 sm:mb-0' onClick={() => handleApprove(person._id, 1)}>
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
                </div >
            </div>
        </>
    )
}

export default AdminProviders