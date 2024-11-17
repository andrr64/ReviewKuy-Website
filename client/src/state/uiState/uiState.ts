import { createSlice } from "@reduxjs/toolkit";

interface UIState {
    loading: boolean;
    upload: boolean;
}

const initialState: UIState = {
    loading: false,
    upload: false
};

const loadingSlice = createSlice({
    name: "uiState",
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