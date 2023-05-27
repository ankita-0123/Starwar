import React from 'react';
import { Link } from 'react-router-dom';

const FavoriteList = ({ favorites, getIdFromUrl }) => {
  return (
    <div className="favorite-list">
      <h3>Favorite Characters:</h3>
      {favorites.length > 0 ? (
        favorites.map((favorite) => (
          <div className="character-item" key={favorite.url}>
            <Link className="character-link" to={`/characters/${getIdFromUrl(favorite.url)}`}>
              {favorite.name}
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
