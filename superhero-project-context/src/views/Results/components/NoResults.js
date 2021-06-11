import React from "react";

export default React.memo(function NoResults() {
  return (
    <div>
      <p>{`No se han encontrado resultados`}</p>
    </div>
  );
});