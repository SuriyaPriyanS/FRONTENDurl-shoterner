import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        token: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken } = userSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/login', credentials);
        dispatch(setToken(response.data.token));
        const user = jwt.decode(response.data.token);
        dispatch(setUser(user));
    } catch (error) {
        console.log('Error logging in', error);
    }
};

export default userSlice.reducer;
