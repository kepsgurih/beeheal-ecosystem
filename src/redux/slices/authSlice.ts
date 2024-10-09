import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    data: any | null;
    error: string | null;
}

const initialState: UserState = {
    data: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<any>) => {
            state.data = action.payload;
            state.error = null;
        },
        setUserError: (state, action: PayloadAction<string>) => {
            state.data = null;
            state.error = action.payload;
        },
    },
});

export const { setUserData, setUserError } = authSlice.actions;
export default authSlice.reducer;