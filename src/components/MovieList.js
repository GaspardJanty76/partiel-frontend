// MovieList.js
import React from 'react';
import { Link } from 'react-router-dom';
import { genresList } from './genres';

const MovieList = ({ movies = [], currentPage = 1, itemsPerPage = 20 }) => {
  if (!movies || movies.length === 0) {
    return <p className="text-white">Aucun film trouvé.</p>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const moviesToDisplay = movies.slice(startIndex, endIndex);

  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genresList.find((genre) => genre.id === id);
        return genre ? genre.name : 'Genre inconnu';
      })
      .join(', ');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {moviesToDisplay.length > 0 ? (
        moviesToDisplay.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-orange-600 text-white p-4 rounded shadow-md hover:shadow-lg transition-shadow duration-300">
            <img 
              src={movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
                : '/vd-046-star-wars-official-poster-ep7.png'} 
              alt={movie.title} 
              className="w-full h-auto rounded"
            />
            <div className="mt-2">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-white-400 text-sm">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Année inconnue'}</p>
              <p className="text-white-500 text-sm mt-1">
                {movie.genre_ids.length > 0
                  ? getGenreNames(movie.genre_ids)
                  : 'Genres inconnus'}
              </p>
              <p className="text-white-300 text-sm mt-2">{movie.overview ? movie.overview.substring(0, 100) + '...' : 'Pas de description disponible.'}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="text-white">Aucun film à afficher.</p>
      )}
    </div>
  );
};

export default MovieList;
