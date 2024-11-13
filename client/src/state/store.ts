import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from './loading/loadingState';
import userSlice from './user/userState';

export const store = configureStore({
    reducer: {
        loading: loadingSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch=  typeof store.dispatch; 