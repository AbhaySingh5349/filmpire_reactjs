import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  isAuthenticated: false,
  sessionId: '',
};

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (prevState, action: PayloadAction<any>) => {
      prevState.user = action.payload;
      prevState.isAuthenticated = true;
      prevState.sessionId = localStorage.getItem('session_id') || '';

      localStorage.setItem('account_id', action.payload.id);
    },
  },
});

export const { setUser } = authSlice.actions;

export default authSlice.reducer;

export const userSelector = (state: any) => state.user;
