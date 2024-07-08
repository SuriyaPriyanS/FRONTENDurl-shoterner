import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const urlSlice = createSlice({
    name: 'urls',
    initialState: {
        urls: [],
    },
    reducers: {
        setUrls(state, action) {
            state.urls = action.payload;
        },
    },
});

export const { setUrls } = urlSlice.actions;

export const fetchUrls = (token) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:5000/api/hihjI8', {
            headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUrls(response.data));
    } catch (error) {
        console.error('Error fetching URLs', error);
    }
};

export default urlSlice.reducer;
