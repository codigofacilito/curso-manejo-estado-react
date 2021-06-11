import React, { useEffect, useContext, useRef, useCallback } from "react";
import { useParams } from "react-router";

import Bio from "./components/Bio";
import BioImage from "./components/BioImage";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import SuperHeroContext from "../../context/superhero";

export default function Biography() {
  const { id } = useParams();
  const { isFetching, bioPhoto, biography, error, fetchSuperHeroBio } = useContext(SuperHeroContext);
  const fetchBioRef = useRef(); 

  const fetchBio = useCallback(async () => {
    await fetchSuperHeroBio(id);
  }, [id]);

  fetchBioRef.current = fetchBio;

  useEffect(() => {
    id && fetchBioRef.current()?.catch(null);
  }, [id]);

  return(
    <div>
      <Header />
      <div className="px-4 py-3 mt-10">
        {isFetching && <Spinner />}
        {!isFetching && !error && biography?.bio && (
          <>
            <BioImage image={bioPhoto} alt={biography?.bio["full-name"]} />
            <Bio {...biography} />
          </>
        )}
      </div>
    </div>
  );
}