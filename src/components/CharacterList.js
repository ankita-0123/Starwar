import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles.css';
import { Favorite } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

const CharacterList = () => {
  const { id } = useParams();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchCharacters = async (url) => {
    try {
      const response = await axios.get(url || 'https://swapi.dev/api/people/');
      const charactersWithImages = await Promise.all(
        response.data.results.map(async (character) => {
          const characterDetails = await axios.get(character.url);
          return {
            ...character,
            image: `https://starwars-visualguide.com/assets/img/characters/${getIdFromUrl(character.url)}.jpg`,
            details: characterDetails.data,
          };
        })
      );
      setCharacters(charactersWithImages);
      setNextPage(response.data.next);
      setPrevPage(response.data.previous);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  useEffect(() => {
    fetchCharacters();
  }, []);

  const getIdFromUrl = (url) => {
    const idRegex = /\/(\d+)\/$/;
    const match = url.match(idRegex);
    if (match) {
      return match[1];
    }
    return null;
  };

  const handleNextPage = () => {
    if (nextPage) {
      fetchCharacters(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchCharacters(prevPage);
    }
  };

  const handleFavorite = (character) => {
    const existingIndex = favorites.findIndex((favorite) => favorite.url === character.url);
    if (existingIndex !== -1) {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(existingIndex, 1);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, character]);
    }
  };

  const handleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>Character List</h2>
      <div className="favorite-link-container">
        <button className="favorite-link" onClick={handleShowFavorites}>
          <Favorite /> ({favorites.length})
        </button>
      </div>
      {showFavorites && (
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
      )}
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
      <div className="pagination-buttons">
        <button className="pagination-button" onClick={handlePrevPage} disabled={!prevPage}>
          Previous
        </button>
        <button className="pagination-button" onClick={handleNextPage} disabled={!nextPage}>
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterList;

