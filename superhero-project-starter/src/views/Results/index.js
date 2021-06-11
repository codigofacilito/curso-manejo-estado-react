import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "./components/ErrorComponent";
import ResultsList from "./components/ResultsList";
import NoResults from "./components/NoResults";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";

export default function Results() {
  const { searchText } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [error, setError] = useState();
  const fetchResultsRef = useRef();

  const fetchResults = useCallback(async () => {
    try {
      setError();
      setResults([]);

      const { data } = await axios.get(`https://superheroapi.com/api.php/10223232565340348/search/${searchText}`);

      setResults(data?.results);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [setError, setResults, setIsLoading, searchText]);

  fetchResultsRef.current = fetchResults;

  useEffect(() => {
    fetchResultsRef.current()?.catch(null);
  }, []);

  return (
    <div>
      <Header />
      <div className="px-3 pb-2 mt-12">
        <h2 className="text-xl font-bold">Resultados para: {searchText}</h2>
        {isLoading && <Spinner />}
        <ErrorComponent error={error} />
        <ResultsList data={results} />
        {!isLoading && !results?.length && <NoResults />}
      </div>
    </div>
  );
}