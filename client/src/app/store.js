import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../app/features/auth/authSlice';
import themeReducer from '../app/features/theme/themeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer
  },
});

export default store;
