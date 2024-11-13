import { createSlice } from "@reduxjs/toolkit";

interface LoadingState {
    loading: boolean;
}

const initialState: LoadingState = {
    loading: false,
};

const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        loadingStart: (state) => {
            state.loading = true;
        },
        loadingEnd: (state) => {
            state.loading = false;
        }
    },
});

export const {loadingEnd, loadingStart } = loadingSlice.actions;
export default loadingSlice.reducer;