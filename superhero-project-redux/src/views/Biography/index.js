import axios from "axios";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import Bio from "./components/Bio";
import BioImage from "./components/BioImage";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";
import { fetchBio } from "../../redux/actions/superhero";
import { biographySel, isFetchingBioSel, superheroesErrSel } from "../../redux/selectors";

export default function Biography() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const biography = useSelector(biographySel);
  const isFetchingBio = useSelector(isFetchingBioSel);
  const biographyErr = useSelector(superheroesErrSel);

  console.log(biography);

  useEffect(() => {
    id && dispatch(fetchBio(id));
  }, [id]);

  return(
    <div>
      <Header />
      <div className="px-4 py-3 mt-10">
        {isFetchingBio && <Spinner />}
        {!isFetchingBio && !biographyErr && (
          <>
            <BioImage image={biography?.photo} alt={biography?.bio["full-name"]} />
            <Bio {...biography} />
          </>
        )}
      </div>
    </div>
  );
}