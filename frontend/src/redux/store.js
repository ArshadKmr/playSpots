import { configureStore } from '@reduxjs/toolkit';

import userLoginReducer from '../features/users/userLoginSlice'
import adminLoginReducer from '../features/admin/adminLoginSlice'
import providerLoginReducer from '../features/provider/providerLoginSlice'
import usersListReducer from '../features/admin/userListSlice'
import providersListReducer from '../features/admin/providerListSlice'
import providerAcceptRejectReducer from '../features/admin/providerAcceptRejectSlice';
import createCategoryReducer from '../features/admin/createCategorySlice'
import categoryListReducer from '../features/admin/categoryListSlice'
import providerCategoryReducer from '../features/provider/providerCategorySlice'
import locationListReducer from '../features/admin/locationListSlice';
import providerLocationReducer from '../features/provider/providerLocationSlice'
import providerTurfReducer from '../features/provider/providerTurfSlice'
import loadingReducer from '../features/loading/loadingSlice'
import updateCategoryReducer from '../features/admin/handleCategorySlice'
import handleLocationReducer from '../features/admin/handleLocationSlice'
import providerTurfListReducer from '../features/provider/turfListSlice'
import userTurfListReducer from '../features/users/userTurfSlice'
import userTurfDetailReducer from '../features/users/userTurfDetailSlice'
import userSearchTurfReducer from '../features/users/userSearchTurfSlice'
import adminTurfListReducer from '../features/admin/turfListSlice'
import handleTurfReducer from '../features/admin/handleTurfSlice'
import handleUserReducer from '../features/admin/handleUserSlice'
import providerRegisterReducer from '../features/provider/providerReqSlice'
import userFilterTurfReducer from '../features/users/userFilterTurfSlice'
import providerSingleTurfReducer from '../features/provider/providerSingleTurfSlice'
import userTurfBookingReducer from '../features/users/userTurfBookingSlice'
import turfIsBookedReducer from '../features/users/turfIsBookedSlice'
import userBookedTurfReducer from '../features/users/userBookedTurfSlice'
import providerBookingListReducer from '../features/provider/providerBookingListSlice'
import providerUpdateBookingReducer from '../features/provider/providerUpdateBookingSlice'
import cancelBookingActionReducer from '../features/users/cancelBookingActionSlice'
import adminBookingListReducer from '../features/admin/adminBookingListSlice'
import userChatListReducer from '../features/users/getChatUsersListSlice'
import userChatMessageReducer from '../features/users/getChatMessagesSlice'
import sendMessageReducer from '../features/users/sendMessageSlice'
import getWalletReducer from '../features/users/getWalletStore'
import getWalletAmountReducer from '../features/users/getWalletAmountSlice'
import turfBookingWalletReducer from '../features/users/turfBookingWalletSlice';
import adminRevenueReducer from '../features/admin/adminRevenueSlice';
import adminUserCountReducer from '../features/admin/adminUserCountSlice'
import adminProviderCountReducer from '../features/admin/adminProviderCountSlice'
import adminTotalBookingReducer from '../features/admin/adminTotalBookingSlice';
import adminTurfCountReducer from '../features/admin/adminTurfCountSlice';
import providerTotalBookingReducer from '../features/provider/providerTotalBookingSlice';
import providerTotalRevenueReducer from '../features/provider/providerTotalRevenueSlice';
import providerTurfCountReducer from '../features/provider/providerTurfCountSlice';
import newMessageNotificationReducer from '../features/users/newMessageNotificationSlice';
import getNotificationReducer from '../features/users/getNotificationSlice';
import adminBookingGraphReducer from '../features/admin/adminBookingGraphSlice';
import adminUserGraphReducer from '../features/admin/adminUserGraphSlice';


const store = configureStore({
    reducer: {
        userLogin: userLoginReducer,
        adminLogin: adminLoginReducer,
        adminUserList: usersListReducer,
        adminProvidersList: providersListReducer,
        providerLogin: providerLoginReducer,
        providerAcceptReject: providerAcceptRejectReducer,
        createCategory: createCategoryReducer,
        categoryList: categoryListReducer,
        providerCategoryList: providerCategoryReducer,
        locationList: locationListReducer,
        providerLocationList: providerLocationReducer,
        providerAddTurf: providerTurfReducer,
        loading: loadingReducer,
        updateCategory: updateCategoryReducer,
        updateLocation: handleLocationReducer,
        providerTurfList: providerTurfListReducer,
        userTurfList: userTurfListReducer,
        userSingleTurf: userTurfDetailReducer,
        userSearchTurf: userSearchTurfReducer,
        adminTurfList: adminTurfListReducer,
        updateTurf: handleTurfReducer,
        updateUser: handleUserReducer,
        providerRegister: providerRegisterReducer,
        userFilterTurf: userFilterTurfReducer,
        providerSingleTurf: providerSingleTurfReducer,
        userTurfBooking: userTurfBookingReducer,
        isTurfBooked: turfIsBookedReducer,
        userBookedTurf: userBookedTurfReducer,
        providerBookingList: providerBookingListReducer,
        updateBooking: providerUpdateBookingReducer,
        cancelBooking: cancelBookingActionReducer,
        adminBookingList: adminBookingListReducer,
        userChatList: userChatListReducer,
        userChatMessage: userChatMessageReducer,
        userSendMessage: sendMessageReducer,
        userWallet: getWalletReducer,
        userWalletAmount: getWalletAmountReducer,
        bookTurfWallet: turfBookingWalletReducer,
        adminWalletAmount: adminRevenueReducer,
        adminUserCount: adminUserCountReducer,
        adminProviderCount: adminProviderCountReducer,
        adminBookings: adminTotalBookingReducer,
        adminTurfs: adminTurfCountReducer,
        providerBookings: providerTotalBookingReducer,
        providerRevenue: providerTotalRevenueReducer,
        providerTurfs: providerTurfCountReducer,
        messageNotification: newMessageNotificationReducer,
        getNotification: getNotificationReducer,
        adminBookingGraph:adminBookingGraphReducer,
        adminUserGraph:adminUserGraphReducer
    },
});

export default store;