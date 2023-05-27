import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';
import { Favorite } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import FavoriteList from '../favorites/FavoriteList';
import CharacterItemList from './CharacterItemList';

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
        <FavoriteList favorites={favorites} getIdFromUrl={getIdFromUrl} />
      )}
      <CharacterItemList
        characters={characters}
        favorites={favorites}
        getIdFromUrl={getIdFromUrl}
        handleFavorite={handleFavorite}
      />
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
