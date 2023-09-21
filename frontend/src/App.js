import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom"

// User Components
import Login from './components/UserComponent/login'
import Register from './components/UserComponent/register';
import Turfs from './components/UserComponent/Turfs';
import Home from './components/UserComponent/UserHome';
import Booking from './components/UserComponent/Booking';
import Checkout from './components/UserComponent/Checkout';
import Profile from './components/UserComponent/Profile';
import Chat from './components/ChatComponent/Chat';

// Admin Components
import AdminLogin from './components/AdminComponent/AdminLogin';
import AdminHome from './components/AdminComponent/AdminHome';
import AdminCategory from './components/AdminComponent/AdminCategory';
import AdminLocation from './components/AdminComponent/AdminLocation';
import AdminTurf from './components/AdminComponent/AdminTurf';
import AdminUsers from './components/AdminComponent/AdminUsers';
import AdminProviders from './components/AdminComponent/AdminProviders';
import AdminBookingsList from './components/AdminComponent/AdminBookingsList';

// Provider Components
import ProviderHome from './components/providerComponent/ProviderHome';
import ProviderLogin from './components/providerComponent/ProviderLogin';
import ProviderRegister from './components/providerComponent/ProviderRegister';
import ProviderWelcome from './components/providerComponent/ProviderWelcome';
import ProviderTurf from './components/providerComponent/ProviderTurf'
import ProviderAddTurf from './components/providerComponent/ProviderAddTurf';
import ProviderSingleTurf from './components/providerComponent/ProviderSingleTurf';
import BookingOrderTurfs from './components/providerComponent/BookingOrderTurfs';
import Maps from './components/Maps/Map';
import PageNotFound from './components/ErrorComponent/PageNotFound';


import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { useSelector } from 'react-redux';
import Wallet from './components/UserComponent/Wallet';
import WalletPayment from './components/UserComponent/WalletPayment';
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

function UserProtected() {
  const { userInfo } = useSelector((state) => state.userLogin);
  return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
}

function App() {

  return (
    <div>
      <Router>
        <Routes>

          {/* Provider Routes */}
          <Route path='/provider' element={<ProviderLogin />} />
          <Route path='/provider/welcome' element={<ProviderWelcome />} />
          <Route path='/provider/register' element={<ProviderRegister />} />
          <Route path='/provider/home' element={<ProviderHome />} />
          <Route path='/provider/turf' element={<ProviderTurf />} />
          <Route path='/provider/turf/addturf' element={<ProviderAddTurf />} />
          <Route path='/provider/singleTurf' element={<ProviderSingleTurf />} />
          <Route path='/provider/booking' element={<BookingOrderTurfs />} />

          {/* Admin Routes */}
          <Route path='/admin' element={<AdminLogin />} />
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/users' element={<AdminUsers />} />
          <Route path='/admin/provider' element={<AdminProviders />} />
          <Route path='/admin/category' element={<AdminCategory />} />
          <Route path='/admin/location' element={<AdminLocation />} />
          <Route path='/admin/turfs' element={<AdminTurf />} />
          <Route path='/admin/bookings' element={<AdminBookingsList />} />

          {/*Users Routes*/}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/turfs' element={<Turfs />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/maps' element={<Maps />} />
          <Route element={<UserProtected />}>
            <Route path='/checkout/:price/:id/:date/:team' element={<Elements stripe={promise}><Checkout /></Elements>} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/wallet' element={<Wallet />} />
            <Route path='/payment/:price/:id/:date/:team' element={<WalletPayment />} />
          </Route>
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

