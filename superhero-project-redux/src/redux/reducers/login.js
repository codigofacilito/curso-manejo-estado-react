import { createReducer } from "@reduxjs/toolkit";
import { 
  checkingAuth,
  completedAuth,
  errorAuth,
  sendingAuthForm,
  completedSendAuthForm,
  errorSendAuthForm,
} from "../actions/login";

const initialState = {
  isCheckingAuth: false,
  isSendingAuthForm: false,
  isSuccessLogged: false,
  isAuth: false,
  error: undefined,
};

const loginReducer = createReducer(initialState, builder => {
  builder.addCase(checkingAuth.toString(), (state, action) => {
    return {
      ...state,
      isCheckingAuth: true,
    };
  })
  .addCase(completedAuth.toString(), (state, action) => {
    return {
      ...state,
      isAuth: action.payload.isAuth,
      isCheckingAuth: false,
    }
  })
  .addCase(errorAuth.toString(), (state, action) => {
    return {
      ...state,
      isAuth: false,
      isCheckingAuth: false,
      error: action.payload.error,
    }
  })
  .addCase(sendingAuthForm.toString(), (state, action) => {
    return {
      ...state,
      isSendingAuthForm: true,
      error: undefined,
    }
  })
  .addCase(completedSendAuthForm.toString(), (state, action) => {
    return {
      ...state,
      isSendingAuthForm: false,
      isSuccessLogged: true,
    }
  })
  .addCase(errorSendAuthForm.toString(), (state, action) => {
    return {
      ...state,
      isSendingAuthForm: false,
      isSuccessLogged: false,
      error: action.payload.error,
    }
  });
});

export default loginReducer;