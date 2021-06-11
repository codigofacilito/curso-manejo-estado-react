import { createReducer } from "@reduxjs/toolkit";

import { 
  errorFetchingSuperheroes,
  startFetchingSuperheroes,
  successFetchingSuperheroes,
  startFetchingBio,
  errorFetchingBio,
  successFetchingBio
} from "../actions/superhero";

const initialState = {
  isFetchingSuperheroes: false,
  isFetchingBio: false,
  bio: {},
  photo: undefined,
  error: undefined,
  work: {},
  connections: {},
  superheroes: [],
};

const superheroReducer = createReducer(initialState, builder => {
  builder.addCase(startFetchingSuperheroes.toString(), (state, action) => {
    return {
      ...state,
      isFetchingSuperheroes: true,
    };
  })
  .addCase(successFetchingSuperheroes.toString(), (state, action) => {
    return {
      ...state,
      isFetchingSuperheroes: false,
      superheroes: action.payload.data,
    }
  })
  .addCase(errorFetchingSuperheroes.toString(), (state, action) => {
    return {
      ...state,
      isFetchingSuperheroes: false,
      superheroes: [],
      error: action.payload.error,
    }
  })
  .addCase(startFetchingBio.toString(), (state, action) => {
    return {
      ...state,
      isFetchingBio: true,
      bio: {},
      photo: undefined,
      error: undefined,
      work: {},
      connections: {},
    }
  })
  .addCase(successFetchingBio.toString(), (state, action) => {
    return {
      ...state,
      isFetchingBio: false,
      bio: action.payload.bio,
      photo: action.payload.photo,
      work: action.payload.work,
      connections: action.payload.connections,
    }
  })
  .addCase(errorFetchingBio.toString(), (state, action) => {
    return {
      ...state,
      isFetchingBio: false,
      error: action.payload.error,
    }
  })
  .addDefaultCase((state, action) => {
    return state;
  });
});

export default superheroReducer;