import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Pagination from './components/Pagination';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const location = useLocation();

  const searchMovies = async (query, page = 1) => {
    const apiKey = '9ab8063e5527bc9c1bfe8f42b607bca1';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}&page=${page}`;

    const response = await fetch(url);
    const data = await response.json();
    setMovies(data.results);
    setTotalResults(data.total_results);
    setCurrentPage(page);
    setSearchQuery(query);
  };

  const handlePageChange = (page) => {
    searchMovies(searchQuery, page);
  };

  const isMovieDetailsPage = location.pathname.startsWith('/movie/');

  return (
    <div className="App">
      <Navbar />
      {!isMovieDetailsPage && <SearchBar onSearch={searchMovies} />}
      <Routes>
        <Route path="/" element={<MovieList movies={movies} currentPage={currentPage} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
      {!isMovieDetailsPage && (
        <Pagination
          currentPage={currentPage}
          totalResults={totalResults}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default App;
