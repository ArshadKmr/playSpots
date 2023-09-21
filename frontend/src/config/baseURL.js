import axios from 'axios'
import store from '../redux/store';
import { setLoading } from '../features/loading/loadingSlice';


export const axiosInstanceAdmin = axios.create({
    baseURL: 'https://playspots.shop/admin/'
});
export const axiosInstanceUser = axios.create({
    baseURL: 'https://playspots.shop/'
});
export const axiosInstanceProvider = axios.create({
    baseURL: 'https://playspots.shop/provider/'
});


axiosInstanceAdmin.interceptors.request.use((config) => {
    store.dispatch(setLoading(true));
    const { adminInfo } = store.getState().adminLogin
    config.headers.Authorization = `Bearer ${adminInfo?.token}`
    return config
})


axiosInstanceProvider.interceptors.request.use((config) => {
    store.dispatch(setLoading(true));
    if (config.url === '/request') {
        const { userInfo } = store.getState().userLogin;
        config.headers.Authorization = `Bearer ${userInfo?.token}`
        return config
    } else {
        const { providerInfo } = store.getState().providerLogin
        config.headers.Authorization = `Bearer ${providerInfo?.token}`
        return config
    }
})

axiosInstanceUser.interceptors.request.use((config) => {
    if (config.url === '/login' || config.url === '/notification') {
        return config
    } else {
        store.dispatch(setLoading(true));
        const { userInfo } = store.getState().userLogin
        config.headers.Authorization = `Bearer ${userInfo?.token}`
        return config
    }
})


axiosInstanceAdmin.interceptors.response.use(response => {
    store.dispatch(setLoading(false));
    return response
})


axiosInstanceProvider.interceptors.response.use((response) => {
    store.dispatch(setLoading(false));
    return response
})

axiosInstanceUser.interceptors.response.use((response) => {
    store.dispatch(setLoading(false))
    return response
})