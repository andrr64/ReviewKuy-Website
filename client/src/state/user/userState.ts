import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../model/user.model";

interface UserState {
    data: UserModel | null
}

const initialState: UserState = {
    data: null
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            state.data = new UserModel(action.payload); // Menggunakan `action.payload`
        },
        logout: (state) => {
            state.data = null; // Set userData ke null saat logout
        },
        changeName: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.name = action.payload; // Mengubah nama user
            }
        },
        changeAvatar: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.avatar = action.payload; // Mengubah avatar user
            }
        }
    }
});

// Export actions login, logout, changeName, dan changeAvatar
export const { login, logout, changeName, changeAvatar } = userSlice.actions;
export default userSlice.reducer;