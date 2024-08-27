import React from 'react';
import { Link } from 'react-router-dom';
import { genresList } from './genres'; // Assurez-vous d'avoir une liste des genres disponibles

const MovieList = ({ movies }) => {
  const defaultImagePath = '/vd-046-star-wars-official-poster-ep7.png'; // Chemin relatif de l'image par défaut

  // Fonction pour obtenir les noms des genres à partir des IDs
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genresList.find((genre) => genre.id === id);
        return genre ? genre.name : 'Genre inconnu';
      })
      .join(', ');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <Link to={`/movie/${movie.id}`} key={movie.id} className="bg-orange-500 text-white p-4 rounded shadow-lg hover:shadow-xl transition-shadow duration-300">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
              : defaultImagePath} 
            alt={movie.title} 
            className="w-full h-auto rounded"
          />
          <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
          <p className="text-sm text-gray-300 mt-1">{movie.release_date ? new Date(movie.release_date).getFullYear() : 'Année inconnue'}</p>
          <p className="text-sm text-gray-100 mt-1">{getGenreNames(movie.genre_ids)}</p>
          <p className="text-sm text-gray-200 mt-2">{movie.overview ? movie.overview.substring(0, 100) + '...' : 'Pas de description disponible.'}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
