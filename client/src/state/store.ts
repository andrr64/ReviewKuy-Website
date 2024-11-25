import { configureStore } from "@reduxjs/toolkit";
import uiStateSlice from './uiState/uiState';
import userSlice from './user/userState';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

// Konfigurasi persist
const persistConfig = {
    key: "root",
    storage,
};

// Gabungkan reducers
const rootReducer = combineReducers({
    uiState: uiStateSlice,
    user: userSlice,
});

// Reducer persisten
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Buat store dengan middleware yang disesuaikan untuk redux-persist
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;