import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import Pagination from './components/Pagination';
import MovieDetails from './components/MovieDetails';
import GenreFilter from './components/GenreFilter';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState('');
  const location = useLocation();

  // Fonction pour charger les films en fonction des filtres et de la recherche
  const loadMovies = async (page = 1) => {
    const apiKey = '9ab8063e5527bc9c1bfe8f42b607bca1';
    let url = '';

    if (searchQuery) {
      url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&page=${page}`;
    } else if (selectedGenre) {
      url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${selectedGenre}&page=${page}`;
    } else {
      url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=${page}`;
    }

    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
    setTotalResults(data.total_results);
    setCurrentPage(page);
  };

  // Charger les films les mieux notés lors du premier rendu ou lors des changements de recherche / filtre
  useEffect(() => {
    loadMovies();
  }, [searchQuery, selectedGenre]);

  const searchMovies = (query, page = 1) => {
    setSearchQuery(query);
    loadMovies(page);
  };

  const handlePageChange = (page) => {
    loadMovies(page);
  };

  const handleFilterChange = (genreId) => {
    setSelectedGenre(genreId);
    loadMovies(1); // Réinitialiser à la première page lors du changement de filtre
  };

  return (
    <div className="App">
      <Navbar />
      {location.pathname !== `/movie/${location.pathname.split('/')[2]}` && (
        <div className="flex flex-col md:flex-row p-4">
          <GenreFilter onFilterChange={handleFilterChange} />
          <div className="flex-grow">
            <SearchBar onSearch={searchMovies} />
            <MovieList movies={movies} />
            <Pagination
              currentPage={currentPage}
              totalResults={totalResults}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
      <Routes>
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;
