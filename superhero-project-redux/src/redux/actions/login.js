import { createAction } from "@reduxjs/toolkit";
import { sendingAuthFormS, completedSendAuthFormS, errorSendAuthFormS } from "../slices/login";

export const checkingAuth = createAction("CHECKING_AUTH");
export const completedAuth = createAction("COMPLETED_AUTH");
export const errorAuth = createAction("ERROR_AUTH");

export const sendingAuthForm = createAction("SENDING_AUTH_FORM");
export const completedSendAuthForm = createAction("COMPLETED_SEND_AUTH_FORM");
export const errorSendAuthForm = createAction("ERROR_SEND_AUTH_FORM");

export const checkIfUserIsAuth = () => (dispatch) => {
  try {
    dispatch(checkingAuth());
    const isAuth = localStorage.getItem("@superhero-isAuth")?.length > 0;
    dispatch(completedAuth({ isAuth }));
  } catch (error) {
    dispatch(errorAuth({ error }));
  }
};

export const submitLogin = (name, email) => (dispatch) => {
  try {
    dispatch(sendingAuthFormS());
    localStorage.setItem("@superhero-isAuth", "true");
    localStorage.setItem("@superhero-data", JSON.stringify({
      name,
      email
    }));

    dispatch(completedSendAuthFormS());
  } catch (error) {
    console.log(error)
    dispatch(errorSendAuthFormS({ error }));
  }
};