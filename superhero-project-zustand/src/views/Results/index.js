import { useEffect } from "react";
import { useParams } from "react-router-dom";
import shallow from "zustand/shallow";

import ErrorComponent from "./components/ErrorComponent";
import ResultsList from "./components/ResultsList";
import NoResults from "./components/NoResults";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import useSuperheroStore from "../../zustand/superhero-store";

export default function Results() {
  const { searchText } = useParams();

  const { fetchSuperheroes, isFetchingSuperheroes, fetchSuperheroesError, superheroes } = useSuperheroStore((state) => ({ 
    fetchSuperheroes: state.fetchSuperheroes,
    isFetchingSuperheroes: state.isFetchingSuperheroes,
    fetchSuperheroesError: state.fetchSuperheroesError,
    superheroes: state.superheroes,
  }), shallow);

  useEffect(() => {
    fetchSuperheroes(searchText);
  }, []);

  return (
    <div>
      <Header />
      <div className="px-3 pb-2 mt-12">
        <h2 className="text-xl font-bold">Resultados para: {searchText}</h2>
        {isFetchingSuperheroes && <Spinner />}
        <ErrorComponent error={fetchSuperheroesError} />
        <ResultsList data={superheroes} />
        {!isFetchingSuperheroes && !superheroes?.length && <NoResults />}
      </div>
    </div>
  );
}