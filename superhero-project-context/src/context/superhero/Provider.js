import { useCallback, useState } from "react";
import axios from "axios";

import SuperHeroContext from "./index";

const apiCall = axios.create({
  baseURL: "https://superheroapi.com/api.php/10223232565340348",
});

export default function SuperHeroProvider({ children }) {
  const [isSearching, setIsSearching] = useState();
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const [biography, setBiography] = useState({});
  const [isFetching, setIsFetching] = useState(false);
  const [bioPhoto, setBioPhoto] = useState();

  const searchSuperHero = async (searchText) => {
    try {
      setIsSearching(true);
      setError();
      setResults([]);

      const { data } = await apiCall.get(`/search/${searchText}`);

      setResults(data?.results);
    } catch (error) {
      setError("Algo ha ocurrido");
    } finally {
      setIsSearching(false);
    }
  };

  const fetchSuperHeroBio = useCallback(async (id) => {
    try {
      setError();
      setBioPhoto();
      setBiography({});
      setIsFetching(true);
      
      const bio = await apiCall.get(`/${id}/biography`);
      const bioPhoto = await apiCall.get(`/${id}/image`);
      const bioWork = await apiCall.get(`/${id}/work`);
      const connections = await apiCall.get(`/${id}/connections`);

      setBiography({ bio: bio.data, bioWork: bioWork.data, connections: connections.data });
      setBioPhoto(bioPhoto?.data?.url);
    } catch (error) {
      setError("Algo ha pasado en las llamadas");
      setBiography({});
      setBioPhoto();
    } finally {
      setIsFetching(false);
    }
  }, [setIsFetching, setBioPhoto, setBiography]);


  return (
    <SuperHeroContext.Provider value={{
      searchSuperHero,
      fetchSuperHeroBio,
      isFetching,
      bioPhoto,
      biography,
      results,
      error,
      isSearching,
    }}>
      {children}
    </SuperHeroContext.Provider>
  );
}