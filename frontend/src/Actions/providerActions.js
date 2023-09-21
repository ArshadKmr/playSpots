import { axiosInstanceProvider } from '../config/baseURL'

import { providerRegisterReq, providerRegisterSuccess, providerRegisterFail } from '../features/provider/providerReqSlice'
import { providerLoginFail, providerLoginReq, providerLoginSuccess } from '../features/provider/providerLoginSlice';
import { categoryListFail, categoryListSuccess, categoryListReq } from '../features/provider/providerCategorySlice';
import { locationListFail, locationListReq, locationListSuccess } from '../features/provider/providerLocationSlice';
import { addTurfFail, addTurfReq, addTurfSuccess } from '../features/provider/providerTurfSlice';
import { turfListFail, turfListReq, turfListSuccess } from '../features/provider/turfListSlice';
import { providerSingleTurfFail, providerSingleTurfReq, providerSingleTurfSuccess } from '../features/provider/providerSingleTurfSlice';
import { providerBookingListFail, providerBookingListReq, providerBookingListSuccess } from '../features/provider/providerBookingListSlice';
import { updateBookingFail, updateBookingReq, updateBookingSuccess } from '../features/provider/providerUpdateBookingSlice';
import { providerTotalBookingFail, providerTotalBookingReq, providerTotalBookingSuccess } from '../features/provider/providerTotalBookingSlice';
import { providerTotalRevenueFail, providerTotalRevenueReq, providerTotalRevenueSuccess } from '../features/provider/providerTotalRevenueSlice';
import { providerTurfCountFail, providerTurfCountReq, providerTurfCountSuccess } from '../features/provider/providerTurfCountSlice';



export const providerReq = (password, country, street, city, state, pin,file) => async (dispatch) => {
    try {
        dispatch(providerRegisterReq())
        const { data } = await axiosInstanceProvider.post('/request', { password, country, street, city, state, pin,file })
        dispatch(providerRegisterSuccess(data));
    } catch (error) {
        const errorIs =
            error.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(providerRegisterFail(errorIs))
    }
}

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(providerLoginReq())
        const { data } = await axiosInstanceProvider.post("/login", { email, password, });
        dispatch(providerLoginSuccess(data))
        localStorage.setItem("providerInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(providerLoginFail(errorIs))
    }
}

export const categoryList = () => async (dispatch) => {
    try {
        dispatch(categoryListReq())
        const { data } = await axiosInstanceProvider.get('/category')
        dispatch(categoryListSuccess(data))
    } catch (error) {
        const errorIs = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(categoryListFail(errorIs))
    }
}

export const locationList = () => async (dispatch) => {
    try {
        dispatch(locationListReq())
        const { data } = await axiosInstanceProvider.get('/location')
        dispatch(locationListSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(locationListFail(message))
    }
}

export const addTurf = (name, description, category, city, street, price, capacity, file) => async (dispatch) => {
    try {
        dispatch(addTurfReq())
        const { data } = await axiosInstanceProvider.post('/addTurf', { name, description, category, city, street, price, capacity, file })
        dispatch(addTurfSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(addTurfFail(message))
    }
}

export const turfList = () => async (dispatch) => {
    try {
        dispatch(turfListReq())
        const { data } = await axiosInstanceProvider.get('/turfList')
        dispatch(turfListSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(turfListFail(message))
    }
}


export const providerSingleTurf = (id) => async (dispatch) => {
    try {
        dispatch(providerSingleTurfReq())
        const { data } = await axiosInstanceProvider.get(`/singleTurf/${id}`)
        dispatch(providerSingleTurfSuccess(data))
        localStorage.setItem('providerSingleTurf', JSON.stringify(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(providerSingleTurfFail(message))
    }
}

export const providerBookingList = () => async (dispatch) => {
    try {
        dispatch(providerBookingListReq())
        const { data } = await axiosInstanceProvider.get('/bookingList')

        dispatch(providerBookingListSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(providerBookingListFail(message))
    }
}

export const updateBookingAction = (id, status) => async (dispatch) => {
    try {
        dispatch(updateBookingReq())
        const { data } = await axiosInstanceProvider.patch('/booking', { id, status })
        dispatch(updateBookingSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(updateBookingFail(message))
    }
}

export const providerTotalBooking = () => async (dispatch) => {
    try {
        dispatch(providerTotalBookingReq())
        const { data } = await axiosInstanceProvider.get('/totalBooking')
        dispatch(providerTotalBookingSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(providerTotalBookingFail(message))
    }
}

export const providerTotalRevenue = () => async (dispatch) => {
    try {
        dispatch(providerTotalRevenueReq())
        const { data } = await axiosInstanceProvider.get('/totalRevenue')
        dispatch(providerTotalRevenueSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(providerTotalRevenueFail(message))
    }
}

export const providerTurfCount = () => async (dispatch) => {
    try {
        dispatch(providerTurfCountReq())
        const { data } = await axiosInstanceProvider.get('/totalTurf')
        dispatch(providerTurfCountSuccess(data))
    } catch (error) {
        const message = error?.response?.data?.message && error.response
            ? error.response.data.message : error.message
        dispatch(providerTurfCountFail(message))
    }
}
