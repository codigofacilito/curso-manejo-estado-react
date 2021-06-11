import React from "react";
import { useHistory } from "react-router-dom";
import ResultsListItem from "./ResultsListItem";

export default React.memo(function ResultsList({ data }) {
  const history = useHistory();

  const handleResultListClick = (resultId) => {
    history.push(`/bio/${resultId}`);
  };

  return (
    <div>
      {data?.map((data, key) => <ResultsListItem {...data} key={key} onClick={handleResultListClick} />)}
    </div>
  );
});