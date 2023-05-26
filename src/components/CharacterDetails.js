import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './characterDetails.css'; 


const CharacterDetails = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/${id}/`);
        setCharacter(response.data);
        setMovies(response.data.films);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching character details:', error);
      }
    };

    fetchCharacterDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    
      <div className="details">
      {character ? (
        <div>
          <h2>{character.name}</h2>
          <img
            src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
            alt={character.name}
          />
          <h3>Name: {character.name}</h3>
         <h3>Height: {character.height}</h3>
         <h3>Gender: {character.gender}</h3>
          <h3>Movies:</h3>
          <ul>
            {movies.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading character details...</p>
      )}
        
      </div>
      
    </div>
  );
};

export default CharacterDetails;
