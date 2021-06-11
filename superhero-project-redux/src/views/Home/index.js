import { useState } from "react";
import { useHistory } from "react-router-dom";
import Header from "../../components/Header";

export default function Home() {
  const [searchText, setSearchText] = useState("");
  const history = useHistory();

  const handleSearchClick = () => {
    history.push(`/results/${searchText}`);
  };

  return (
    <div className="justify-center items-center flex h-screen">
      <Header />
      <div className="md:flex flex-col">
        <h2 className="text-4xl mb-4 font-bold">Buscador de superheroes</h2>
        <div className="flex justify-center align-items-center">
          <input
            value={searchText}
            onChange={({ target: { value }}) => setSearchText(value)}
            className="px-1 py-1 rounded text-sm border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent w-56 shadow-sm"
          />
          <button
            className="bg-blue-600 hover:bg-blue-800 rounded-sm ml-3 px-3 text-white text-sm cursor-pointer w-24"
            disabled={searchText?.length === 0}
            onClick={handleSearchClick}>Buscar</button>
          <button 
            className={`text-white bg-gray-400 hover:bg-gray-600 ml-2 rounded-sm ${searchText?.length > 0 ? 'visible' : 'invisible'} w-20`}
            onClick={() => setSearchText("")}
          >Limpiar</button>
        </div>
      </div>
    </div>
  );
}