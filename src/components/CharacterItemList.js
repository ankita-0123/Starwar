import React from 'react';
import { Link } from 'react-router-dom';

const CharacterItemList = ({ characters, favorites, getIdFromUrl, handleFavorite }) => {
  return (
    <div className="character-list">
      {characters.map((character) => (
        <div className="character-item" key={character.url}>
          <Link to={`/characters/${getIdFromUrl(character.url)}`}>
            <img src={character.image} alt={character.name} className="character-image" />
            <div className="character-name">{character.name}</div>
          </Link>
          <button className="favorite-button" onClick={() => handleFavorite(character)}>
            {favorites.some((favorite) => favorite.url === character.url)
              ? 'Remove Favorite'
              : 'Add Favorite'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CharacterItemList;
