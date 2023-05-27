import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoriteList.css';

const FavoriteList = ({ favorites, getIdFromUrl }) => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);

  
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteCharacters');
    if (storedFavorites) {
      setFavoriteCharacters(JSON.parse(storedFavorites));
    }
  }, []);
  

  
  useEffect(() => {
    localStorage.setItem('favoriteCharacters', JSON.stringify(favoriteCharacters));
  }, [favoriteCharacters]);

  useEffect(() => {
    setFavoriteCharacters(favorites);
  }, [favorites]);

  return (
    <div className="favorite-list">
      <h3>Favorite Characters:</h3>
      {favoriteCharacters.length > 0 ? (
        favoriteCharacters.map((character) => (
          <div className="character-item" key={character.url}>
            <Link className="character-link" to={`/characters/${getIdFromUrl(character.url)}`}>
              {character.name}
            </Link>
          </div>
        ))
      ) : (
        <div>No favorite characters yet.</div>
      )}
    </div>
  );
};

export default FavoriteList;
