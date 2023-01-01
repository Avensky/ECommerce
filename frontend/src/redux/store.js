import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './reducers/shop';
import authReducer from './reducers/auth';

export default configureStore({
    reducer: {
        shop: shopReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
});