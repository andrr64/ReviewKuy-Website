import { configureStore } from "@reduxjs/toolkit";
import loadingSlice from './loading/loadingState';
import userSlice from './user/userState';
import storage from "redux-persist/lib/storage"; // Pilih penyimpanan yang akan digunakan, misalnya localStorage
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

// Konfigurasi persist
const persistConfig = {
    key: "root", // Kunci utama untuk penyimpanan
    storage, // Menggunakan localStorage
};

// Gabungkan reducers
const rootReducer = combineReducers({
    loading: loadingSlice,
    user: userSlice,
});

// Reducer persisten
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Buat store dengan reducer yang sudah dipersist
export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store); // Persistor untuk mengontrol penyimpanan

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
