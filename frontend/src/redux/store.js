import { configureStore } from '@reduxjs/toolkit';
import storeReducer from './reducers/store';

export default configureStore({
    reducer: {
        store: storeReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})