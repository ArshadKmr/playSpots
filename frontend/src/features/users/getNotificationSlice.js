import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    getNotificationError: null,
    getNotifications: [],
};

const getNotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        getNotificationReq: (state, actions) => {
            state.loading = true;
        },
        getNotificationSuccess: (state, actions) => {
            state.loading = false;
            state.getNotifications.push(actions.payload)
        },
        getNotificationFail: (state, actions) => {
            state.loading = false;
            state.getNotificationError = actions.payload
        }
    },
});

export default getNotificationSlice.reducer
export const { getNotificationFail, getNotificationReq, getNotificationSuccess } = getNotificationSlice.actions