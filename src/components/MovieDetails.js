import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const defaultImagePath = '/vd-046-star-wars-official-poster-ep7.png';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const apiKey = '9ab8063e5527bc9c1bfe8f42b607bca1';
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,reviews`;

      const response = await fetch(url);
      const data = await response.json();
      setMovie(data);
      setLoading(false);
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!movie) {
    return <div>Pas de film trouvé</div>;
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        <img 
          src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` 
              : defaultImagePath} 
          alt={movie.title}
          className="w-full md:w-1/3 h-auto rounded shadow-lg"
        />
        <div className="mt-4 md:mt-0 md:w-2/3">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-gray-700 mt-2">{movie.overview}</p>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Date de sortie :</h2>
            <p>{movie.release_date}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Genre(s) :</h2>
            <p>{movie.genres.map((genre) => genre.name).join(', ')}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Note :</h2>
            <p>{movie.vote_average} / 10</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Synopsis complet :</h2>
            <p>{movie.overview}</p>
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Acteurs principaux :</h2>
            {movie.credits.cast.length > 0 ? (
              movie.credits.cast.slice(0, 5).map((actor) => (
                <div key={actor.id} className="mt-2">
                  <p className="font-semibold">{actor.name} ({actor.character})</p>
                </div>
              ))
            ) : (
              <p>Aucun acteur principal disponible</p>
            )}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Commentaires :</h2>
            {movie.reviews.results.length > 0 ? (
              movie.reviews.results.map((review) => (
                <div key={review.id} className="mt-2 p-2 border-b border-gray-300">
                  <p className="font-semibold">{review.author}</p>
                  <p>{review.content}</p>
                </div>
              ))
            ) : (
              <p>Pas de Commentaire disponible pour ce film</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <Link to="/" className="text-blue-500 underline">Retour à la liste des films</Link>
      </div>
    </div>
  );
};

export default MovieDetails;
