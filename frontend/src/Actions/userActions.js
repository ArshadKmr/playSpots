import { axiosInstanceUser } from "../config/baseURL";

import { userLoginFail, userLoginReq, userLoginSuccess, userLogout, } from '../features/users/userLoginSlice'
import { userRegisterReq, userRegisterSuccess, userRegisterFail, } from '../features/users/userRegisterSlice'
import { listTurfFail, listTurfReq, listTurfSuccess } from "../features/users/userTurfSlice";
import { turfDetailFail, turfDetailReq, turfDetailSuccess } from "../features/users/userTurfDetailSlice";
import { searchTurfSuccess, searchTurfFail, searchTurfReq } from "../features/users/userSearchTurfSlice";
import { filterTurfFail, filterTurfReq, filterTurfSuccess } from "../features/users/userFilterTurfSlice";
import { turfBookingFail, turfBookingReq, turfBookingSuccess } from "../features/users/userTurfBookingSlice";
import { isBookedFail, isBookedReq, isBookedSuccess } from "../features/users/turfIsBookedSlice";
import { userBookedTurfReq, userBookedTurfFail, userBookedTurfSuccess } from "../features/users/userBookedTurfSlice";
import { cancelBookingFail, cancelBookingReq, cancelBookingSuccess } from "../features/users/cancelBookingActionSlice";
import { getUserFail, getUserReq, getUserSuccess } from "../features/users/getChatUsersListSlice";
import { getChatFail, getChatReq, getChatSuccess } from "../features/users/getChatMessagesSlice";
import { sendMessageFail, sendMessageReq, sendMessageSuccess } from "../features/users/sendMessageSlice";
import { getWalletFail, getWalletReq, getWalletSuccess } from "../features/users/getWalletStore";
import { getWalletAmountFail, getWalletAmountReq, getWalletAmountSuccess } from "../features/users/getWalletAmountSlice";
import { bookTurfWalletFail, bookTurfWalletReq, bookTurfWalletSuccess } from "../features/users/turfBookingWalletSlice";
import { setNotificationFail, setNotificationReq, setNotificationSuccess } from "../features/users/newMessageNotificationSlice";
import { getNotificationFail, getNotificationReq, getNotificationSuccess } from "../features/users/getNotificationSlice";



export const login = (email, password) => async (dispatch) => {
    try {
        dispatch(userLoginReq());
        const { data } = await axiosInstanceUser.post("/login", { email, password, });
        dispatch(userLoginSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(userLoginFail(errorIs))
    }
}

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch(userLogout());
};

export const register = (name, email, mobile, password,) => async (dispatch) => {
    try {
        dispatch(userRegisterReq());
        const { data } = await axiosInstanceUser.post("/register", { name, email, mobile, password, }
        );
        dispatch(userRegisterSuccess(data));
        dispatch(userLoginSuccess(data));
        localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(userRegisterFail(errorIs));
    }
};


export const listTurf = () => async (dispatch) => {
    try {
        dispatch(listTurfReq());
        const { data } = await axiosInstanceUser.get('/turf')
        dispatch(listTurfSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(listTurfFail(errorIs))
    }
}


export const turfDetail = (id) => async (dispatch) => {
    try {
        dispatch(turfDetailReq())
        const { data } = await axiosInstanceUser.get(`/turfDetail/${id}`)
        dispatch(turfDetailSuccess(data))
        localStorage.setItem('singleTurf', JSON.stringify(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(turfDetailFail(errorIs))
    }
}

export const searchTurf = (value) => async (dispatch) => {
    try {
        dispatch(searchTurfReq())
        const { data } = await axiosInstanceUser.get(`/searchTurf/${value}`)
        dispatch(searchTurfSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(searchTurfFail(errorIs))
    }
}

export const filterTurf = (id) => async (dispatch) => {
    try {
        dispatch(filterTurfReq())
        const { data } = await axiosInstanceUser.get(`/filterTurf/${id}`)
        dispatch(filterTurfSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(filterTurfFail(errorIs))
    }
}

export const bookTurf = (price) => async (dispatch) => {
    try {
        const data = await axiosInstanceUser.post(`/booking/payment/${price}`)
        return data
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        console.log(errorIs)
    }
}


export const turfBooking = (price, id, date, paymentId, team) => async (dispatch) => {
    try {
        dispatch(turfBookingReq())
        const { data } = await axiosInstanceUser.post('/turfBooking', { price, id, date, paymentId, team })
        dispatch(turfBookingSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(turfBookingFail(errorIs))
        return error
    }
}

export const isBooked = (date, id) => async (dispatch) => {
    try {
        dispatch(isBookedReq())
        const { data } = await axiosInstanceUser.get(`/isBooked/${id}/${date}`);
        dispatch(isBookedSuccess(data));
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(isBookedFail(errorIs))
    }
}

export const userBookedTurfs = () => async (dispatch) => {
    try {
        dispatch(userBookedTurfReq())
        const { data } = await axiosInstanceUser.get('/booking')
        dispatch(userBookedTurfSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(userBookedTurfFail(errorIs))
    }
}

export const cancelBookingAction = (id) => async (dispatch) => {
    try {
        dispatch(cancelBookingReq())
        const { data } = await axiosInstanceUser.patch('/booking', { id })
        dispatch(cancelBookingSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(cancelBookingFail(errorIs))
    }
}

export const createChat = (receiverId) => async (dispatch) => {
    try {
        // dispatch(createChatReq())
        const { data } = await axiosInstanceUser.post('/chat/createChat', { receiverId })
        // console.log("data : ", data)
        return data
    } catch (error) {
        console.log(error.message)
    }
}

export const getUser = () => async (dispatch) => {
    try {
        dispatch(getUserReq())
        const { data } = await axiosInstanceUser.get(`/chat/allChat`)
        dispatch(getUserSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(getUserFail(errorIs))
    }
}

export const getChat = (id) => async (dispatch) => {
    try {
        dispatch(getChatReq())
        const { data } = await axiosInstanceUser.get(`/message/${id}`)
        dispatch(getChatSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(getChatFail(errorIs))
    }
}


export const sendMessageAction = (chatId, content) => async (dispatch) => {
    try {
        dispatch(sendMessageReq())
        const { data } = await axiosInstanceUser.post('/message', { chatId, content })
        dispatch(sendMessageSuccess(data))
        return data
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(sendMessageFail(errorIs))
    }
}

export const getWallet = () => async (dispatch) => {
    try {
        dispatch(getWalletReq())
        const { data } = await axiosInstanceUser.get('/wallet')
        dispatch(getWalletSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(getWalletFail(errorIs))
    }
}

export const getWalletAmount = () => async (dispatch) => {
    try {
        dispatch(getWalletAmountReq())
        const { data } = await axiosInstanceUser.get('/wallet/amount')
        dispatch(getWalletAmountSuccess(data))
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(getWalletAmountFail(errorIs))
    }
}

export const bookTurfWallet = (price, id, date, team) => async (dispatch) => {
    try {
        dispatch(bookTurfWalletReq())
        const { data } = await axiosInstanceUser.post('/booking/wallet', { price, id, date, team })
        dispatch(bookTurfWalletSuccess(data))
        return data
    } catch (error) {
        const errorIs =
            error?.response && error?.response?.data?.message
                ? error.response.data.message
                : error.message;
        dispatch(bookTurfWalletFail(errorIs));
    }
}

export const setNotification = (message) => async (dispatch) => {
    try {
        dispatch(setNotificationReq())
        const { data } = await axiosInstanceUser.post('/notification', { message })
        dispatch(setNotificationSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(setNotificationFail(message))
    }
}

export const getNotification = () => async (dispatch) => {
    try {
        dispatch(getNotificationReq())
        const { data } = await axiosInstanceUser.get('/notification')
        dispatch(getNotificationSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
            ? error.response.data.message : error.message
        dispatch(getNotificationFail(message))
    }
}

export const updateNotification = (id) => async (dispatch) => {
    try {
        // dispatch(updateNotificationReq())
        const { data } = await axiosInstanceUser.patch('/notification',{id})
        // dispatch(updateNotificationSuccess(data))
    } catch (error) {
        const message = error?.response && error?.response?.data?.message
        ? error.response.data.message : error.message
    // dispatch(updateNotificationFail(message))
    }
}