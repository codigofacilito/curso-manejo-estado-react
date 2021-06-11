import { createAction } from "@reduxjs/toolkit";

import apiCall from "../api";

export const startFetchingSuperheroes = createAction("START_FETCHING_SUPERHEROES");
export const errorFetchingSuperheroes = createAction("ERROR_FETCHING_SUPERHEROES");
export const successFetchingSuperheroes = createAction("SUCCESS_FETCHING_SUPERHEROES");

export const fetchSuperheroes = (text) => async (dispatch) => {
  try {
    dispatch(startFetchingSuperheroes());
    const { data } = await apiCall.get(`/search/${text}`);
    dispatch(successFetchingSuperheroes({ data: data?.results }));
  } catch (error) {
    dispatch(errorFetchingSuperheroes({ error }));
  }
} 

export const startFetchingBio = createAction("START_FETCHING_BIO");
export const errorFetchingBio = createAction("ERROR_FETCHING_BIO");
export const successFetchingBio = createAction("SUCCESS_FETCHING_BIO");

export const fetchBio = (id) => async (dispatch) => {
  try {
    dispatch(startFetchingBio());
    
    const bioData = await apiCall.get(`/${id}/biography`);
    const bioPhoto = await apiCall.get(`/${id}/image`);
    const bioWorkRes = await apiCall.get(`/${id}/work`);
    const bioConnectionsRes = await apiCall.get(`/${id}/connections`);

    dispatch(successFetchingBio({
      bio: bioData.data,
      photo: bioPhoto.data?.url ?? undefined,
      work: bioWorkRes.data,
      connections: bioConnectionsRes.data,
    }));
  } catch (error) {
    dispatch(errorFetchingBio({ error }));
  }
};