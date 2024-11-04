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
    },
});

export const { setLoading, setError, resetUIState } = uiSlice.actions;
export default uiSlice.reducer;
