import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckingAuth: false,
  isSendingAuthForm: false,
  isSuccessLogged: false,
  isAuth: false,
  error: undefined,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    sendingAuthFormS: (state) => {
      state.isSendingAuthForm = true;
      state.error = undefined;
    },
    completedSendAuthFormS: (state) => {
      state.isSendingAuthForm = false;
      state.isSuccessLogged = true;
    },
    errorSendAuthFormS: (state, action) => {
      state.isSendingAuthForm = false;
      state.isSuccessLogged = false;
      state.error = action.payload.error;
    },
  }
});

export const { 
  sendingAuthFormS,
  completedSendAuthFormS,
  errorSendAuthFormS, 
} = loginSlice.actions;

export default loginSlice;