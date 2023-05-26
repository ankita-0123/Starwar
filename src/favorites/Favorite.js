import React from 'react';
import { Link } from 'react-router-dom';
import './Favorite.css';

const Favorite = ({ favorite }) => {
  return (
    <div className="character-item">
      <Link className="character-link" to={`/characters/${favorite.url.split('/').reverse()[1]}`}>
        {favorite.name}
      </Link>
    </div>
  );
};

export default Favorite;


