import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import ErrorComponent from "./components/ErrorComponent";
import ResultsList from "./components/ResultsList";
import NoResults from "./components/NoResults";
import Header from "../../components/Header";
import Spinner from "../../components/Spinner";
import { fetchSuperheroes } from "../../redux/actions/superhero";
import { isFetchingSuperheroesSel, superheroesErrSel, superheroesSel } from "../../redux/selectors";

export default function Results() {
  const { searchText } = useParams();
  const dispatch = useDispatch();
  const isFetchingSuperheroes = useSelector(isFetchingSuperheroesSel, shallowEqual);
  const superheroes = useSelector(superheroesSel, shallowEqual);
  const superheroesErr = useSelector(superheroesErrSel, shallowEqual);


  useEffect(() => {
    dispatch(fetchSuperheroes(searchText));
  }, []);

  return (
    <div>
      <Header />
      <div className="px-3 pb-2 mt-12">
        <h2 className="text-xl font-bold">Resultados para: {searchText}</h2>
        {isFetchingSuperheroes && <Spinner />}
        <ErrorComponent error={superheroesErr} />
        <ResultsList data={superheroes} />
        {!isFetchingSuperheroes && !superheroes?.length && <NoResults />}
      </div>
    </div>
  );
}