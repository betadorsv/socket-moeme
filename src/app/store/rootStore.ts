import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../../features/Login/Login/loginSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;