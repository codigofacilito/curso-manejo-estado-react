import { createSelector } from "@reduxjs/toolkit";

export const isAuthSel = state => state.loginReducer.isAuth;
export const isCheckingAuthSel = state => state.loginReducer.isCheckingAuth;
export const isSuccessLoggedSel = state => state.loginReducer.isSuccessLogged;
export const isSendingAuthFormSel = state => state.loginReducer.isSendingAuthForm;

export const isFetchingSuperheroesSel = state => state.superheroReducer.isFetchingSuperheroes;
export const superheroesErrSel = state => state.superheroReducer.error;
export const superheroesSel = state => state.superheroReducer.superheroes;

export const bioSel = state => state.superheroReducer.bio;
export const bioPhotoSel = state => state.superheroReducer.photo;
export const bioWorkSel = state => state.superheroReducer.work;
export const bioConnectionsSel = state => state.superheroReducer.connections;
export const isFetchingBioSel = state => state.superheroReducer.isFetchingBio;

export const biographySel = createSelector(
  bioSel,
  bioPhotoSel,
  bioWorkSel,
  bioConnectionsSel,
  (bio, photo, work, connections) => ({
    bio,
    photo,
    work,
    connections
  })
);