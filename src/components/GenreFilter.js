// components/GenreFilter.js
import React, { useEffect, useState } from 'react';

const GenreFilter = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');

  useEffect(() => {
    const fetchGenres = async () => {
      const apiKey = '9ab8063e5527bc9c1bfe8f42b607bca1';
      const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      setGenres(data.genres);
    };

    fetchGenres();
  }, []);

  const handleGenreChange = (event) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onFilterChange(genreId);
  };

  return (
    <div className="mb-4">
      <label htmlFor="genre-filter" className="block text-white font-bold mb-2">Filtrer par genre</label>
      <select
        id="genre-filter"
        value={selectedGenre}
        onChange={handleGenreChange}
        className="my-2 p-2 rounded bg-orange-500 text-white"
      >
        <option value="">Tous les genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default GenreFilter;
