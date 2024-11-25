import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../../model/user.model";

interface UserState {
    data: UserModel | null;
}

const initialState: UserState = {
    data: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            // Menggunakan UserModel dan menyimpannya dalam format serializable
            state.data = new UserModel(action.payload);
        },
        logout: (state) => {
            state.data = null;
        },
        changeName: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.name = action.payload;
            }
        },
        changeAvatar: (state, action: PayloadAction<string>) => {
            if (state.data) {
                state.data.avatar = action.payload;
            }
        },
    },
});

export const { login, logout, changeName, changeAvatar } = userSlice.actions;
export default userSlice.reducer;
