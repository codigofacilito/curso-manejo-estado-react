import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./reducers/login";
import superheroReducer from "./reducers/superhero";
import loginSlice from "./slices/login";

export default configureStore({
  reducer: {
    loginReducer,
    superheroReducer,
    loginSlice,
  },
});