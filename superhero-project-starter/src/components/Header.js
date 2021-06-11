import React, { useMemo } from "react";
import { useHistory } from "react-router";

export default React.memo(function Header() {
  const history = useHistory();
  const data = useMemo(() => JSON.parse(localStorage.getItem("@superhero-data")), []);
  
  const handleTitleClick = () => {
    history.push("/");
  };

  return (
    <div className="absolute bg-green-400 flex flex-row w-full h-10 top-0 flex items-center px-4 py-1">
      <div className="flex-1 font-bold cursor-pointer" onClick={handleTitleClick}>Superhero search</div>
      <div className="flex-1">
        <p className="text-right font-bold">Bienvenido, {data?.name}</p>
      </div>
    </div>
  );
})