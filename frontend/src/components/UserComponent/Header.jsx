import { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dialog, Menu, Popover, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import icon from '../../assets/Images/WHITE.png'
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../../features/users/userLoginSlice';
import { getNotification } from '../../Actions/userActions';


export default function Header() {

    const pages = ['HOME', 'TURFS', 'BECOME A PARTNER']
    const links = ['/', '/turfs', '/provider/welcome']

    const [current, setCurrent] = useState(null)
    const [showNotifications, setShowNotifications] = useState(false);
    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin;

    const notification = useSelector((state) => state.getNotification)
    const { getNotifications } = notification
    const unReadMessage = getNotifications[0]?.notification?.filter(item=>item.read===false)

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()


    const logoutHandler = () => {
        dispatch(userLogout());
        localStorage.removeItem("userInfo");
        setMobileMenuOpen(false)
        navigate("/");
    };

    const userNavigation = [
        { name: 'Sign out', function: logoutHandler }
    ]

    useEffect(() => {
        if (location.pathname === '/') {
            setCurrent('HOME')
        } else {
            let path = location.pathname.split('/');
            setCurrent(path[1].toUpperCase())
            dispatch(getNotification())
        }
    }, [location, dispatch]);

    return (
        <div className="min-h-full">
            <header style={{ backgroundColor: 'rgb(17, 24, 39)' }}>
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <Link to='/home' className='-m-1.5 p-1.5'>
                            <span className="sr-only text-indigo-600">Play Spots</span>
                            <img className="h-10 w-auto animate-pulse" src={icon} alt="" />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <div className="relative">
                            <BellIcon onClick={() => console.log('hi')} className="w-5 h-6 text-white mr-3" />
                            {getNotifications[0]?.notification?.length > 0 && (
                                <span className="absolute top-0 right-3 flex items-center justify-center w-3 h-3 bg-red-500 text-white text-xs rounded-full">
                                    {unReadMessage?.length}
                                </span>
                            )}
                        </div>
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-indigo-600"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <Popover.Group className="hidden lg:flex lg:gap-x-12">
                        {pages.map((pages, index) => (
                            <Link to={`${links[index]}`} key={index} className={current === pages ? ("text-sm font-semibold leading-6 text-white bg-indigo-600 rounded px-1") : ("text-sm font-semibold leading-6 text-white")}>
                                {pages}
                            </Link>
                        ))}
                    </Popover.Group>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
                        {userInfo ?
                            <>
                                <div className="relative">
                                    <BellIcon onClick={toggleNotifications} className="w-7 h-7 text-white mr-3" />
                                    {showNotifications && (
                                        <div className="absolute z-10 top-10 right-0 bg-white border shadow-lg rounded p-2 w-48">
                                            <h2 className="text-lg text-center font-semibold mb-2">New Messages</h2>
                                            <hr />
                                            <ul>
                                                {unReadMessage?.map((notification, index) => (
                                                    <li key={index} onClick={() => console.log('hello')} className=" text-center text-xs my-2 bg-sky-500 rounded p-2">
                                                        {notification.content}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    {getNotifications[0]?.notification?.length > 0 && (
                                        <span className="absolute top-0 right-3 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">
                                            {unReadMessage?.length}
                                        </span>
                                    )}
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src='https://cdn-icons-png.flaticon.com/512/3135/3135715.png' alt="" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    {userNavigation.map((item) => (
                                                        <Menu.Item key={item.name}>
                                                            {() => (
                                                                <>
                                                                    <Link className={current === 'PROFILE' ? ('block px-4 py-2 text-sm text-white w-full text-center bg-indigo-600') : ('block px-4 py-2 text-sm text-gray-700 w-full text-center')} to={'/profile'}>Profile</Link>
                                                                    <hr />
                                                                    <Link className={current === 'WALLET' ? ('block px-4 py-2 text-sm text-white w-full text-center bg-indigo-600') : ('block px-4 py-2 text-sm text-gray-700 w-full text-center')} to={'/wallet'}>Wallet</Link>
                                                                    <hr />
                                                                    <Link className={current === 'CHAT' ? ('block px-4 py-2 text-sm text-white w-full text-center bg-indigo-600') : ('block px-4 py-2 text-sm text-gray-700 w-full text-center')} to={'/chat'}>Messages</Link>
                                                                    <hr />
                                                                    <button
                                                                        onClick={item.function}
                                                                        className='block px-4 py-2 text-sm text-gray-700 w-full'
                                                                    >
                                                                        {item.name}
                                                                    </button>
                                                                </>
                                                            )}
                                                        </Menu.Item>
                                                    ))}
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                            </>
                            :
                            <div className="hidden lg:flex lg:flex-1 lg:justify-end space-x-4">
                                <Link to="/login" className="text-sm font-semibold leading-6 text-indigo-600">
                                    Log in <span aria-hidden="true">&rarr;</span>
                                </Link>
                                <Link to="/register" className="text-sm font-semibold leading-6 text-indigo-600">
                                    Sign Up <span aria-hidden="true">&rarr;</span>
                                </Link>
                            </div>}
                    </div>
                </nav>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                    <div className="fixed inset-0 z-10" />
                    <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10" style={{ backgroundColor: 'rgb(17, 24, 39)' }}>
                        <div className="flex items-center justify-between">
                            <Link className="-m-1.5 p-1.5">
                                <span className="sr-only">Play Spots</span>
                                <img
                                    className="h-8 w-auto animate-pulse"
                                    src="https://www.playspots.in//wp-content/uploads/2018/10/WHITE.png"
                                    alt=""
                                />
                            </Link>
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-white"
                                onClick={() => setMobileMenuOpen(false)}>
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    {pages.map((page, index) => (
                                        <Link to={`${links[index]}`} key={index} className={current === page ? ("-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black bg-indigo-600/90 hover:bg-indigo-600") : ("-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-indigo-600")}>{page}</Link>
                                    ))}
                                </div>
                                <div className="py-6">
                                    {userInfo ?
                                        <>
                                            <Link className={current === 'PROFILE' ? ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50 bg-white') : ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50')} to={'/profile'}>Profile</Link>
                                            <Link className={current === 'WALLET' ? ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50 bg-white') : ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50')} to={'/wallet'}>Wallet</Link>
                                            <Link className={current === 'CHAT' ? ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50 bg-white') : ('-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50')} to={'/chat'}>Messages</Link>
                                            <button className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-50" onClick={logoutHandler}>LogOut</button>
                                        </> :
                                        <div>
                                            <Link to="/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-100">
                                                Log in
                                            </Link>
                                            <Link to="/register" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-indigo-600 hover:bg-gray-100">
                                                Sign Up
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </Dialog.Panel>
                </Dialog>
            </header>
            <section>
                <div className="relative isolate h-16 flex items-center gap-x-6 overflow-hidden bg-gray-50 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
                    <div className='absolute xl:left-36'>
                        <h1 className="text-4xl  font-bold tracking-tight text-gray-900">{current}</h1>
                    </div>
                    <div
                        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#1100ff] to-[#1100ff] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                            }}
                        />
                    </div>
                    <div
                        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[577/310] w-[36.0625rem] bg-gradient-to-r from-[#1100ff] to-[#1100ff] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(74.8% 41.9%, 97.2% 73.2%, 100% 34.9%, 92.5% 0.4%, 87.5% 0%, 75% 28.6%, 58.5% 54.6%, 50.1% 56.8%, 46.9% 44%, 48.3% 17.4%, 24.7% 53.9%, 0% 27.9%, 11.9% 74.2%, 24.9% 54.1%, 68.6% 100%, 74.8% 41.9%)',
                            }}
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}
