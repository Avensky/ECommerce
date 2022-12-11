import { configureStore } from '@reduxjs/toolkit';
import shopReducer from './reducers/shop';

export default configureStore({
    reducer: {
        shop: shopReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})