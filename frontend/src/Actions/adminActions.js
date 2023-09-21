import { axiosInstanceAdmin } from '../config/baseURL'


import { adminLoginFail, adminLoginReq, adminLoginSuccess, adminLogout, } from '../features/admin/adminLoginSlice'
import { usersListReq, usersListSuccess, usersListFail } from "../features/admin/userListSlice";
import { providersListFail, providersListReq, providersListSuccess } from '../features/admin/providerListSlice';
import { providerAcceptRejectFail, providerAcceptRejectReq, providerAcceptRejectSuccess } from '../features/admin/providerAcceptRejectSlice';
import { createCategoryFail, createCategoryReq, createCategorySuccess } from '../features/admin/createCategorySlice';
import { categoryListFail, categoryListSuccess, categoryListReq } from '../features/admin/categoryListSlice';
import { handleCategoryFail, handleCategorySuccess, handleCategoryReq } from '../features/admin/handleCategorySlice';
import { addLocationFail, addLocationSuccess, addLocationReq } from '../features/admin/createLocationSlice';
import { locationListFail, locationListReq, locationListSuccess } from '../features/admin/locationListSlice';
import { handleLocationFail, handleLocationReq, handleLocationSuccess } from '../features/admin/handleLocationSlice';
import { adminTurfFail, adminTurfReq, adminTurfSuccess } from '../features/admin/turfListSlice';
import { handleTurfFail, handleTurfReq, handleTurfSuccess } from '../features/admin/handleTurfSlice';
import { handleUserFail, handleUserReq, handleUserSuccess } from '../features/admin/handleUserSlice';
import { adminBookingListFail, adminBookingListReq, adminBookingListSuccess } from '../features/admin/adminBookingListSlice';
import { adminRevenueFail, adminRevenueReq, adminRevenueSuccess } from '../features/admin/adminRevenueSlice';
import { adminUserCountFail, adminUserCountReq, adminUserCountSuccess } from '../features/admin/adminUserCountSlice';
import { adminProviderCountFail, adminProviderCountReq, adminProviderCountSuccess } from '../features/admin/adminProviderCountSlice';
import { adminTotalBookingSuccess, adminTotalBookingsFail, adminTotalBookingsReq } from '../features/admin/adminTotalBookingSlice';
import { adminTurfCountFail, adminTurfCountReq, adminTurfCountSuccess } from '../features/admin/adminTurfCountSlice';
import { adminBookingGraphFail, adminBookingGraphReq, adminBookingGraphSuccess } from '../features/admin/adminBookingGraphSlice';
import { adminUserGraphFail, adminUserGraphReq, adminUserGraphSuccess } from '../features/admin/adminUserGraphSlice';


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(adminLoginReq());
        const { data } = await axiosInstanceAdmin.post(
            "/login",
            {
                email,
                password,
            }
        );
        dispatch(adminLoginSuccess(data));
        localStorage.setItem("adminInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(adminLoginFail(errorIs))
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("adminInfo");
    dispatch(adminLogout());
};

export const listUsers = () => async (dispatch) => {
    try {
        dispatch(usersListReq());
        const { data } = await axiosInstanceAdmin.get(`/users/list`);
        dispatch(usersListSuccess(data));
    } catch (error) {
        const message =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(usersListFail(message));
    }
};

export const listProviders = () => async (dispatch) => {
    try {
        dispatch(providersListReq())
        const { data } = await axiosInstanceAdmin.get(`/providers/list`)
        dispatch(providersListSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message;
        dispatch(providersListFail(message))
    }
}

export const providerAcceptRejectAction = (id, status) => async (dispatch) => {
    try {
        dispatch(providerAcceptRejectReq())
        const sendStatus = {
            action: status,
        };
        const { data } = await axiosInstanceAdmin.patch(`/providers/approval/${id}`, sendStatus)
        dispatch(providerAcceptRejectSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message;
        dispatch(providerAcceptRejectFail(message));
    }
}

export const addCategory = (name) => async (dispatch) => {
    try {
        dispatch(createCategoryReq())
        const { data } = await axiosInstanceAdmin.post('/category/addcategory', { name })
        dispatch(createCategorySuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(createCategoryFail(message))
    }
}

export const categoryList = () => async (dispatch) => {
    try {
        dispatch(categoryListReq())
        const { data } = await axiosInstanceAdmin.get('/category')
        dispatch(categoryListSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(categoryListFail(message))
    }
}

export const handleCategory = (id, status) => async (dispatch) => {
    try {
        dispatch(handleCategoryReq())
        const { data } = await axiosInstanceAdmin.patch('/category', { id, status })
        console.log(data.category._id)
        dispatch(handleCategorySuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(handleCategoryFail(message))
    }
}

export const addLocation = (location) => async (dispatch) => {
    try {
        dispatch(addLocationReq())
        const { data } = await axiosInstanceAdmin.post('/location', { location })
        dispatch(addLocationSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(addLocationFail(message))
    }
}

export const locationList = () => async (dispatch) => {
    try {
        dispatch(locationListReq())
        const { data } = await axiosInstanceAdmin.get('/location')
        dispatch(locationListSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(locationListFail(message))
    }
}

export const handleLocation = (id, status) => async (dispatch) => {
    try {
        dispatch(handleLocationReq())
        const { data } = await axiosInstanceAdmin.patch('/location', { id, status })
        dispatch(handleLocationSuccess(data))
        console.log(data)
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(handleLocationFail(message))
    }
}

export const adminTurfList = () => async (dispatch) => {
    try {
        dispatch(adminTurfReq())
        const { data } = await axiosInstanceAdmin.get('/turfList')
        dispatch(adminTurfSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminTurfFail(message))
    }
}

export const handleTurf = (id, status) => async (dispatch) => {
    try {
        dispatch(handleTurfReq())
        const { data } = await axiosInstanceAdmin.patch('/turfList', { id, status })
        dispatch(handleTurfSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(handleTurfFail(message))
    }
}


export const handleUser = (id, status) => async (dispatch) => {
    try {
        dispatch(handleUserReq())
        const { data } = await axiosInstanceAdmin.patch('/user', { id, status })
        dispatch(handleUserSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(handleUserFail(message))
    }
}

export const adminBookingList = () => async (dispatch) => {
    try {
        dispatch(adminBookingListReq())
        const { data } = await axiosInstanceAdmin.get('/booking')
        dispatch(adminBookingListSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminBookingListFail(message))
    }
}

export const adminRevenue = () => async (dispatch) => {
    try {
        dispatch(adminRevenueReq())
        const { data } = await axiosInstanceAdmin.get('/revenue')
        dispatch(adminRevenueSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminRevenueFail(message))
    }
}

export const adminUserCount = () => async (dispatch) => {
    try {
        dispatch(adminUserCountReq())
        const { data } = await axiosInstanceAdmin.get('/userCount')
        dispatch(adminUserCountSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminUserCountFail(message))
    }
}

export const adminProviderCount = () => async (dispatch) => {
    try {
        dispatch(adminProviderCountReq())
        const { data } = await axiosInstanceAdmin.get('/providerCount')
        dispatch(adminProviderCountSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminProviderCountFail(message))
    }
}

export const adminTotalBookings = () => async (dispatch) => {
    try {
        dispatch(adminTotalBookingsReq())
        const { data } = await axiosInstanceAdmin.get('/totalBooking')
        dispatch(adminTotalBookingSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminTotalBookingsFail(message))
    }
}

export const adminTurfCount = () => async (dispatch) => {
    try {
        dispatch(adminTurfCountReq())
        const { data } = await axiosInstanceAdmin.get('/turfCount')
        dispatch(adminTurfCountSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminTurfCountFail(message))
    }
}

export const adminBookingGraph = () => async (dispatch) => {
    try {
        dispatch(adminBookingGraphReq())
        const { data } = await axiosInstanceAdmin.get('/graph/booking')
        dispatch(adminBookingGraphSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminBookingGraphFail(message))
    }
}

export const adminUserGraph = () => async (dispatch) => {
    try{
        dispatch(adminUserGraphReq())
        const {data}=await axiosInstanceAdmin.get('/graph/user')
        dispatch(adminUserGraphSuccess(data))
    }catch(error){
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(adminUserGraphFail(message))
    }
}