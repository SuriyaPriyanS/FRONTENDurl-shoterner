import { configureStore } from '@reduxjs/toolkit';
import userReducer from './src/Slice/UserSlice';
import urlReducer from './src/Slice/UrlSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    urls: urlReducer,
  },
});

export default store;
