import create from "zustand";
import { devtools } from "zustand/middleware";

import apiCall from "./api";

const superheroStore = create(devtools((set) => ({
  isFetchingSuperheroes: false,
  fetchSuperheroesError: undefined,
  superheroes: [],
  fetchSuperheroes: async (searchText) => {
    try {
      set({ fetchSuperheroesError: undefined, superheroes: [], isFetchingSuperheroes: true });
      const { data } = await apiCall.get(`/search/${searchText}`);
      set({ superheroes: data?.results });
    } catch (error) {
      set({ fetchSuperheroesError: error });
    } finally {
      set({ isFetchingSuperheroes: false });
    }
  },
})));

export default superheroStore;