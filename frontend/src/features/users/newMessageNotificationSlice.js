import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    notificationError: null,
    notifications: [],
};

const newMessageNotificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotificationReq: (state, actions) => {
            state.loading = true;
        },
        setNotificationSuccess: (state, actions) => {
            state.loading = false;
            state.notifications = actions.payload
        },
        setNotificationFail: (state, actions) => {
            state.loading = false;
            state.notificationError = actions.payload
        }
    },
});

export default newMessageNotificationSlice.reducer
export const { setNotificationFail, setNotificationReq, setNotificationSuccess } = newMessageNotificationSlice.actions