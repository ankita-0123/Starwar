import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const CharacterPhoto = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    try {
      const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
      setCharacter(response.data);
    } catch (error) {
      console.log("Error fetching character:", error);
    }
  };

  return (
    <div>
      {character ? (
        <div>
          <h2>{character.name}</h2>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character.name}
          />
        </div>
      ) : (
        <p>Loading character photo...</p>
      )}
    </div>
  );
};

export default CharacterPhoto;