import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    loading: boolean;
    error: string | null;
}

const initialState: UIState = {
    loading: false,
    error: null,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
        resetUIState: (state) => {
            state.loading = false;
            state.error = null;
        },
        loadingStart: (state) => {
            state.loading = true;
        },
        loadingEnd: (state) => {
            state.loading = false;
        }
    },
});

export const { setLoading, setError, resetUIState, loadingEnd, loadingStart } = uiSlice.actions;
export default uiSlice.reducer;
