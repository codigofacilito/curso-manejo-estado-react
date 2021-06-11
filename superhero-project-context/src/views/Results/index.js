import { useCallback, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";

import ErrorComponent from "./components/ErrorComponent";
import ResultsList from "./components/ResultsList";
import NoResults from "./components/NoResults";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import SuperHeroContext from "../../context/superhero";

export default function Results() {
  const { error, results, isSearching, searchSuperHero } = useContext(SuperHeroContext);
  const { searchText } = useParams();  
  const fetchResultsRef = useRef();

  const fetchResults = useCallback(async () => {
    await searchSuperHero(searchText);
  }, [searchText]);

  fetchResultsRef.current = fetchResults;

  useEffect(() => {
    fetchResultsRef.current()?.catch(null);
  }, []);

  return (
    <div>
      <Header />
      <div className="px-3 pb-2 mt-12">
        {!error ? (
          <>
            <h2 className="text-xl font-bold">Resultados para: {searchText}</h2>
            {isSearching && <Spinner />}
            <ResultsList data={results} />
            {!isSearching && !results?.length && <NoResults />}
          </>
        ) : (
          <ErrorComponent error={error} />
        )}
        
      </div>
    </div>
  );
}