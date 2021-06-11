import axios from "axios";
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useParams } from "react-router";

import Bio from "./components/Bio";
import BioImage from "./components/BioImage";
import Spinner from "../../components/Spinner";
import Header from "../../components/Header";

export default function Biography() {
  const { id } = useParams();
  const [bio, setBio] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [bioImage, setBioImage] = useState();
  const [bioWork, setBioWork] = useState();
  const [bioConnections, setBioConnections] = useState();
  const [bioPowerStats, setBioPowerStats] = useState();

  const fetchBioRef = useRef(); 

  const fetchBio = useCallback(async () => {
    try {
      const bioData = await axios.get(`https://superheroapi.com/api.php/10223232565340348/${id}/biography`);
      const bioPhoto = await axios.get(`https://superheroapi.com/api.php/10223232565340348/${id}/image`);
      const bioWorkRes = await axios.get(`https://superheroapi.com/api.php/10223232565340348/${id}/work`);
      const bioConnectionsRes = await axios.get(`https://superheroapi.com/api.php/10223232565340348/${id}/connections`);
      const bioPowerStatsRes = await axios.get(`https://superheroapi.com/api.php/10223232565340348/${id}/powerstats`);

      setBio(bioData.data);
      setBioImage(bioPhoto.data);
      setBioWork(bioWorkRes.data);
      setBioConnections(bioConnectionsRes.data);
      setBioPowerStats(bioPowerStatsRes.data);

    } catch (error) {
      setError(error);
      setBio(null);
      setBioImage(null);
      setBioWork(null);
      setBioConnections(null);
      setBioPowerStats(null);
    } finally {
      setIsLoading(false);
    }
  }, [id, setBio, setBioImage, setBioWork, setBioConnections, setBioPowerStats, setError, setIsLoading]);

  fetchBioRef.current = fetchBio;

  useEffect(() => {
    id && fetchBioRef.current()?.catch(null);
  }, [id]);

  const biography = useMemo(() => ({ 
    bio, 
    bioWork,
    connections: bioConnections,
    powerStats: bioPowerStats 
  }), [
    bioWork, 
    bio,
    bioConnections,
    bioPowerStats
  ]);

  return(
    <div>
      <Header />
      <div className="px-4 py-3 mt-10">
        {isLoading && <Spinner />}
        {!isLoading && !error && (
          <>
            <BioImage image={bioImage?.url} alt={bio["full-name"]} />
            <Bio {...biography} />
          </>
        )}
      </div>
    </div>
  );
}