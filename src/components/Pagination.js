import React from 'react';

const Pagination = ({ currentPage, totalResults, onPageChange }) => {
  const itemsPerPage = 20;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const pageNumbers = [];

  if (totalPages <= 6) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage < 5) {
      pageNumbers.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (currentPage >= 5 && currentPage <= totalPages - 4) {
      pageNumbers.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
    } else {
      pageNumbers.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    }
  }

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Précédent
      </button>
      {pageNumbers.map((number, index) => (
        <button
          key={index}
          onClick={() => number !== '...' && onPageChange(number)}
          className={`px-4 py-2 mx-1 rounded ${
            currentPage === number ? 'bg-orange-500 text-white' : 'bg-gray-300 text-gray-700'
          }`}
        >
          {number}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 mx-1 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
      >
        Suivant
      </button>
    </div>
  );
};

export default Pagination;
